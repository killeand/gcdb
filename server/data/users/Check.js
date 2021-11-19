import Express from 'express';
import _ from 'lodash';

import GetUserDetails from '../../middleware/GetUserDetails.js';

import Users from '../../models/Users.js';
import LoginTokens from '../../models/LoginTokens.js';

const ROUTE = Express.Router();

ROUTE.get(/^.*$/, GetUserDetails, Express.json(), (req, res, next) => {
    res.status(200).json(res.locals.UserDetails);
});

export default ROUTE;