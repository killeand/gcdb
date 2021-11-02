import Express from 'express';
import _ from 'lodash';

import Users from '../../../models/Users';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), (req, res, next) => {
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

export default ROUTE;