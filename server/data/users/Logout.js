import Express from 'express';
import _ from 'lodash';

import LoginTokens from '../../models/LoginTokens.js';

const ROUTE = Express.Router();

ROUTE.get(/^.*$/, async (req, res, next) => {
    req.session.destroy((error) => {
        if (!error) {
            res.clearCookie("GCDBC").json({code:1, success:"You have been logged out"});
        }
    });
    return;
});

export default ROUTE;