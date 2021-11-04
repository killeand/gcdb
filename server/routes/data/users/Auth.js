import Express from 'express';
import _ from 'lodash';
import BCrypt from 'bcrypt';

import Users from '../../../models/Users';
import LoginTokens from '../../../models/LoginTokens';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), async (req, res, next) => {
    if (!_.isEmpty(req.body)) {
        let missingfields = "";
        if (!req.body.Email) missingfields += "Email address "
        if (!req.body.Password) missingfields += "Password "
        if (missingfields != "") {
            res.status(400).contentType("application/json").send({"code":1,"error":"The following fields are missing: " + missingfields});
            return;
        }

        let test = await Users.find({Email: "blah"}, { Cheese: 1, Email: 1});
        console.log(test);

        Users.findOne({Email: req.body.Email}, (error, user_doc) => {
            if (error) {
                res.status(500).contentType("application/json").send({"code":2,"error":"Unable to run the requested funtion"});
                return;
            }

            if (!_.isEmpty(user_doc)) {
                if (BCrypt.hashSync(req.body.Password, user_doc.Salt) == user_doc.Password) {
                    LoginTokens.deleteMany({ID:user_doc._id}, (error) => {
                        if (error) {
                            res.status(500).contentType("application/json").send({"code":6,"error":"Unable to run the requested function"});
                            return;
                        }

                        let TokenDate = Date.now();
                        let NewToken = BCrypt.hashSync(user_doc._id + req.ip + TokenDate, 5);
                        NewToken = NewToken.substr(NewToken.lastIndexOf("$") + 1);

                        LoginTokens.insertMany({Token: NewToken, ID:user_doc._id, IP: req.ip, Generated: TokenDate}, (error) => {
                            if (error) {
                                res.status(500).contentType("application/json").send({"code":7, "error":"Could not generate a token, please wait and try again"});
                                return;
                            }

                            req.session.Token = NewToken;
                            req.session.save();
                            res.status(200).contentType("application/json").send({"code":0,"success":"You have successfully logged in"});
                            return;
                        });
                    });
                }
                else {
                    res.status(200).contentType("application/json").send({"code":3,"error":"Invalid username and password combination"});
                }
            }
            else {
                res.status(200).contentType("application/json").send({"code":4,"error":"Invalid username and password combination"});
                return;
            }
        })
    }
    else {
        res.status(400).contentType("application/json").send({"code":5,"error":"The fields required for this query were not provided."})
        return;
    }
});

export default ROUTE;