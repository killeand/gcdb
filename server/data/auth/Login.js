import Express from 'express';
import _ from 'lodash';
import BCrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import faker from 'faker';

import Users from '../../models/Users.js';
import RefreshTokens from '../../models/RefreshTokens.js';
import SecretManager from '../../SecretManager.js';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), async (req, res, next) => {
    // INPUT SANITY CHECK
    if (_.isEmpty(req.body)) {
        res.status(400).json({code:1, error:"The fields required for this query were not provided."})
        return;
    }

    let missingfields = "";
    if (!req.body.Email) missingfields += "Email address "
    if (!req.body.Password) missingfields += "Password "
    if (missingfields != "") {
        res.status(400).json({code:2, error:"The following fields are missing: " + missingfields});
        return;
    }

    // GET USER BY EMAIL
    let UserDoc = null;
    try {
        UserDoc = await Users.findOne({Email: req.body.Email}, {DisplayName:1,Password:1,Salt:1,Perms:1});
    }
    catch (error) {
        res.status(500).json({code:3, error:"Unable to run the requested funtion"});
        return;
    }
    if (UserDoc == null) {
        res.json({code:4, error:"Invalid username and password combination"});
        return;
    }

    // CHECK USER EMAIL/PASSWORD
    if (BCrypt.hashSync(req.body.Password, UserDoc.Salt) != UserDoc.Password) {
        res.json({code:5, error:"Invalid username and password combination"});
        return;
    }

    // REMOVE EXISTING REFRESH TOKENS
    try {
        RefreshTokens.deleteMany({ID:UserDoc._id});
    }
    catch (error) {
        res.json({code:6, error:"Unable to run the requested function"});
        return;
    }

    // GENERATE AUTH AND REFRESH TOKENS
    let Secret = new SecretManager();
    let accessbody = {
        iss: req.hostname,
        aud: "GCDBUser",
        exp: Date.now() + (10 * 60 * 1000),
        iat: Date.now(),
        user: {
            DisplayName: UserDoc.DisplayName,
            Perms: UserDoc.Perms
        }
    }
    let refreshbody = {
        iss: req.hostname,
        aud: "GCDBUser",
        exp: Date.now() + (10 * 60 * 1000),
        iat: Date.now(),
        tid: Buffer.from(faker.random.alphaNumeric(32)).toString("base64url")
    }
    
    let access_token = JWT.sign(accessbody, Secret.Get(), {algorithm:"HS512"});
    let refresh_token = JWT.sign(refreshbody, Secret.Get(), {algorithm:"HS512"});


    res.json({code:8, access_token: access_token, refresh_token: refresh_token, token_type: "Bearer"});
    return;
});

export default ROUTE;