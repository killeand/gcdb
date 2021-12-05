import _ from 'lodash';
import Users from '../models/Users.js';
import RefreshTokens from '../models/RefreshTokens.js';

export default (permissions) => {
    if (!_.isNil(permissions))
    return async (req, res, next) => {
    // Load session token
    let TokenID = (_.has(req, "session.Token"))?req.session.Token:null;
    if (_.isNil(TokenID)) {
        res.status(400).json({code:1,error:"Not logged in"});
        return;
    }

    // Load token user id
    let TokenData = null;
    try {
        TokenData = await RefreshTokens.findOne({Token: TokenID}, {ID:1, IP:1});
    }
    catch (error) {
        res.status(500).json({code:2,error:"Problem loading the requested data"});
        return;
    }

    // Token not found (old cookie)
    if (TokenData == null) {
        req.session.destroy();
        res.status(400).clearCookie("GCDBC").json({code:3,error:"Not logged in"});
        return;
    }

    // Session security check (same location)
    if (req.ip != TokenData.IP) {
        req.session.destroy();
        await RefreshTokens.deleteMany({Token: TokenID});
        res.status(400).clearCookie("GCDBC").json({code:4,error:"Not logged in"});
        return;
    }

    // Load user permissions
    let UserData = null;
    try {
        UserData = await Users.findOne({_id: TokenData.ID}, {DisplayName:1, Email:1, Friends:1, Perms:1});
    }
    catch (error) {
        res.status(500).json({code:5,error:"Problem loading the requested data"});
        return;
    }

    // User doesn't exist
    if (UserData == null) {
        res.status(400).json({code:6,error:"User data not available"});
        return;
    }

    res.locals.UserDetails = UserData;

    // Check permissions if exists
    if (!_.isNil(permissions)) {
        if ((UserData.Perms & permissions) != permissions) {
            res.status(403).json({code:7,error:"User not authorized to view this content"});
            return;
        }
    }

    next();
}