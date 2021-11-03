import Express from 'express';
import _ from 'lodash';

import Users from '../../../models/Users';
import LoginTokens from '../../../models/LoginTokens';

const ROUTE = Express.Router();

ROUTE.post(/^.*$/, Express.json(), (req, res, next) => {
    return;
});

export default ROUTE;