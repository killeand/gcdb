import Express from 'express';
import _ from 'lodash';
import JWT from 'jsonwebtoken';
import SecretManager from '../../SecretManager.js';
import RefreshTokens from '../../models/RefreshTokens.js';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), async (req, res, next) => {
    if (!_.has(req.body, "refresh_token")) {
        res.status(400).json({code:1,error:"You must supply a refresh_token field"});
        return;
    }

    let Secret = new SecretManager();
    let AuthToken = null;
    
    try {
        AuthToken = JWT.verify(req.body.refresh_token, Secret.Secret, { audience: "GCDBUser", issuer: req.hostname });
    }
    catch (error) {
        console.error("JWTVerify:", error);
    }

    if (_.isNil(AuthToken)) {
        res.status(400).json({code:2,error:"There is a problem with the supplied refresh token"});
        return;
    }

    if (!_.has(AuthToken, "rid")) {
        res.status(400).json({code:3,error:"There is a problem with the supplied refresh token"});
        return;
    }

    try {
        await RefreshTokens.deleteOne({Token:AuthToken.rid});
    }
    catch (error) {
        console.error("RefreshToken Delete:", error);
    }
    
    res.status(200).json({code:4,success:"User logged out"});
    return;
});

export default ROUTE;