import Users from '../models/Users.js';
import LoginTokens from '../models/LoginTokens.js';

const GetUserDetails = async (req, res, next) => {
    // Load Session Token
    let TokenID = req.session.Token;

    if (!TokenID) {
        res.status(400).json({code:1,error:"Not logged in"});
        return;
    }

    // Load Token User ID
    let TokenData = null;

    try {
        TokenData = await LoginTokens.findOne({Token: TokenID}, {ID:1, IP:1});
    }
    catch (error) {
        res.status(500).json({code:2,error:"Problem loading the requested data"});
        return;
    }

    if (TokenData == null) {
        req.session.destroy();
        res.status(400).json({code:3,error:"Not logged in"});
        return;
    }

    if (req.ip != TokenData.IP) {
        req.session.destroy();
        await LoginTokens.deleteMany({Token: TokenID});
        res.status(400).json({code:4,error:"Not logged in"});
        return;
    }

    // Load User Permissions
    let UserData = null;

    try {
        UserData = await Users.findOne({_id: TokenData.ID}, {DisplayName:1, Email:1, Friends:1, Perms:1});
    }
    catch (error) {
        res.status(500).json({code:5,error:"Problem loading the requested data"});
        return;
    }

    if (UserData == null) {
        res.status(400).json({code:6,error:"User data not available"});
        return;
    }

    res.locals.UserDetails = UserData;
    next();
}

export default GetUserDetails;