import _ from 'lodash';

export default (permissions) => {
    return async (req, res, next) => {
        if (_.isNil(permissions)) {
            res.status(500).json({code:1,error:"There was an issue with the application."});
            return;
        }

        if (_.isNil(res.locals.Token)) {
            res.status(400).json({code:2,error:"Not logged in"});
            return;
        }

        if (!_.has(res.locals.Token, "user.Perms")) {
            res.status(400).json({code:3,error:"Required information is missing from your profile. Please log out and try again."});
            return;
        }

        let UserPerms = res.locals.Token.user.Perms;

        if ((UserPerms & permissions) != permissions) {
            res.status(403).json({code:4,error:"User not authorized to view this content"});
            return;
        }

        next();
    }
}