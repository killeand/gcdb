import Express from 'express';
import _ from 'lodash';

import Users from '../../../models/Users';
import LoginTokens from '../../../models/LoginTokens';

const ROUTE = Express.Router();

ROUTE.post("/login", Express.json(), (req, res, next) => {
    
});

export default ROUTE;