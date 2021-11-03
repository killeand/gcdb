import BCrypt from 'bcrypt';

import Users from '../models/Users';
import LoginTokens from '../models/LoginTokens';

const DB_SETUP = () => (req, res, next) => {
    Users.deleteMany({}, (err) => { if (err) console.error(err); });
    LoginTokens.deleteMany({}, (err) => { if (err) console.error(err); });

    let GenSalt = BCrypt.genSaltSync(12);
    let GenPass = BCrypt.hashSync("admin", GenSalt);

    Users.insertMany({
        DisplayName: "Killean",
        Email: "killean@shaw.ca",
        Password: GenPass,
        Salt: GenSalt,
        Friends: []
    }, {}, (err, resp) => { if (err) console.error(err); if (resp) res.send("App is set up..."); });

    return;
};

export default DB_SETUP;