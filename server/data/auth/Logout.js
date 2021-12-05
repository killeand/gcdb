import Express from 'express';
import _ from 'lodash';

import RefreshTokens from '../../models/RefreshTokens.js';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), async (req, res, next) => {
    if (!_.has(req.body, "refresh_token"))
    
    // Remove any tokens
    if (!_.isNil(TokenID)) {
        try {
            RefreshTokens.deleteOne({Token:TokenID});
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