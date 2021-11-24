import Express from 'express';
import _ from 'lodash';

import LoginTokens from '../../models/LoginTokens.js';

const ROUTE = Express.Router();

ROUTE.get(/^.*$/, async (req, res, next) => {
    // Load session token
    let TokenID = (_.has(req, "session.Token"))?req.session.Token:null;
    
    // Remove any tokens
    if (!_.isNil(TokenID)) {
        try {
            LoginTokens.deleteOne({Token:TokenID});
        }
        catch (error) {
            // do nothing for now
        }
    }

    // Destroy session
    req.session.destroy((error) => {
        if (!error) {
            res.clearCookie("GCDBC").json({code:1, success:"You have been logged out"});
        }
        else {
            res.clearCookie("GCDBC").json({code:2, success:"You have been logged out"});
        }
    });
    return;
});

export default ROUTE;