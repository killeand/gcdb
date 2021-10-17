import Express from 'express';
import BCrypt from 'bcrypt';
import _ from 'lodash';

import Users from '../models/Users';
import LoginTokens from '../models/LoginTokens';

const MODEL_ROUTES = Express.Router();

MODEL_ROUTES.get("/setup", (req, res, next) => {
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
});

MODEL_ROUTES.post("/data/users", Express.json(), (req, res, next) => {
    if (req.headers["content-type"] != "application/json") {
        res.status(400).contentType("application/json").send({"error": "Request must be supplied as a content type of application/json"});
        return;
    }

    if (!_.isEmpty(req.body)) {
        if (!req.body.Email) {
            res.status(400).contentType("application/json").send({"error": "No Email field for searching has been provided."});
            return;
        }

        Users.find({Email: req.body.Email}, (err, docs) => {
            if (err) {
                res.status(500).contentType("application/json").send({"error": "Unable to run the requested find statement."});
                return;
            }

            res.status(200).contentType("application/json").send(docs);
            return;
        });
    }
    else {
        Users.find({}, (err, docs) => {
            if (err) {
                res.status(500).contentType("application/json").send({"error": "Unable to run the requested find statement."});
                return;
            }

            res.status(200).contentType("application/json").send(docs);
            return;
        });
    }
});

export default MODEL_ROUTES;