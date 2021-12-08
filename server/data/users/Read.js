import Express from 'express';
import _ from 'lodash';
import Users from '../../models/Users.js';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), async (req, res, next) => {
    if (_.isEmpty(res.locals.UserDetails)) {
        res.error(400).json({code:1, error:"User not logged in"});
        return;
    }

    if (_.isEmpty(req.body)) {
        let SearchObj = null;

        if (res.locals.UserDetails.Perms & 0x1 == 0x1) {
            SearchObj = {};
        }
        else {
            SearchObj = { _id: res.locals.UserDetails._id };
        }

        try {
            let UserDocs = await Users.find(SearchObj, {DisplayNames:1, Email:1, Friends:1});
            res.json({code:2, data: UserDocs});
            return;
        }
        catch (error) {
            res.status(500).json({code:3, error: "Unable to run the requested find statement."});
            return;
        }
    }
    else {
        if (!req.body.Email) {
            res.status(400).json({code:4, error: "No Email field for searching has been provided."});
            return;
        }

        if (res.locals.UserDetails.Email != req.body.Email) {
            if (res.locals.UserDetails.Perms & 0x1 != 0x1) {
                res.status(400).json({code:5, error: "Unknown user"});
                return;
            }
        }
    
        try {
            let UserDocs = await Users.find({Email: req.body.Email}, {DisplayNames:1, Email:1, Friends:1});
            res.json({code:6, data: UserDocs});
            return;
        }
        catch (error) {
            res.status(500).json({code:7, error: "Unable to run the requested find statement."});
            return;
        }
    }
});

export default ROUTE;