import Express from 'express';
import _ from 'lodash';
import BCrypt from 'bcrypt';

import Users from '../../models/Users';
import LoginTokens from '../../models/LoginTokens';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), async (req, res, next) => {
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

    let UserDoc = null;

    try {
        UserDoc = await Users.findOne({Email: req.body.Email});
    }
    catch (error) {
        res.status(500).json({code:3, error:"Unable to run the requested funtion"});
        return;
    }

    if (UserDoc == null) {
        res.json({code:4, error:"Invalid username and password combination"});
        return;
    }

    if (BCrypt.hashSync(req.body.Password, user_doc.Salt) != user_doc.Password) {
        res.json({code:5, error:"Invalid username and password combination"});
        return;
    }

    try {
        await LoginTokens.deleteMany({ID:UserDoc._id});
    }
    catch (error) {
        res.status(500).json({code:6, error:"Unable to run the requested function"});
        return;
    }

    let TokenDate = Date.now();
    let NewToken = BCrypt.hashSync(UserDoc._id + req.ip + TokenDate, 5);
    NewToken = NewToken.substr(NewToken.lastIndexOf("$") + 1);

    try {
        await LoginTokens.insertMany({Token: NewToken, ID: UserDoc._id, IP: req.ip, Generated: TokenDate});
    }
    catch (error) {
        res.status(500).json({code:7, error:"Could not generate a token, please wait and try again"});
        return;
    }

    req.session.Token = NewToken;
    req.session.save();
    res.json({code:8, success:"You have successfully logged in"});
    return;
});

export default ROUTE;