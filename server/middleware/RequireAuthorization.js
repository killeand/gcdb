import _ from 'lodash';
import JWT from 'jsonwebtoken';

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

    res.locals.AuthToken = AuthValue[1];
    
    next();
}