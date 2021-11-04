import Express from 'express';
import _ from 'lodash';

import Users from '../../../models/Users';
import LoginTokens from '../../../models/LoginTokens';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), (req, res, next) => {
    if (req.session.Token) {
        
    }
    else {
        res.status(200).contentType("application/json").send({"code":1,"error":"Not logged in"})
    }
});

export default ROUTE;