import Express from 'express';
import _ from 'lodash';

import GetUserDetails from '../../../middleware/GetUserDetails';

import Users from '../../../models/Users';
import LoginTokens from '../../../models/LoginTokens';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, GetUserDetails, Express.json(), (req, res, next) => {
    res.status(200).json(res.locals.UserDetails);
});

export default ROUTE;