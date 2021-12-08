import _ from 'lodash';
import JWT from 'jsonwebtoken';
import SecretManager from '../SecretManager.js';

export default (req, res, next) => {
    if (_.isNil(req.headers['Authorization'])) {
        res.status(400).contentType("application/json").send({code:1, error:"Request must include an Authorization header"});
        return;
    }

    let AuthValue = req.headers['Authorization'].split(' ');

    if (AuthValue.length != 2) {
        res.status(400).contentType("application/json").send({code:2, error:"Request Authorization is not properly formatted"});
        return;
    }

    if (AuthValue[0] != "Bearer") {
        res.status(400).contentType("application/json").send({code:3, error:"Request Authorization must include a token type of Bearer"});
        return;
    }

    let Secret = new SecretManager();
    let AuthToken = null;
    
    try {
        AuthToken = JWT.verify(AuthValue[1], Secret.Secret, { audience: "GCDBUser", issuer: req.hostname });
    }
    catch (error) {
        console.error("JWTVerify:", error);
    }

    res.locals.Token = AuthToken;
    
    next();
}