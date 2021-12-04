import BCrypt from 'bcrypt';

import Users from '../models/Users.js';
import RefreshTokens from '../models/RefreshTokens.js';

export default (req, res, next) => {
    Users.deleteMany({}, (err) => { if (err) console.error(err); });
    RefreshTokens.deleteMany({}, (err) => { if (err) console.error(err); });

    let GenSalt = BCrypt.genSaltSync(12);
    let GenPass = BCrypt.hashSync("admin", GenSalt);

    Users.insertMany({
        DisplayName: "Killean",
        Email: "killean@shaw.ca",
        Password: GenPass,
        Salt: GenSalt,
        Friends: [],
        Perms: 0x3
    }, {}, (err, resp) => { if (err) console.error(err); if (resp) res.send("App is set up..."); });

    return;
};