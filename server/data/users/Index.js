import Express from 'express';

import Read from './Read.js';
import Auth from './Auth.js';
import Check from './Check.js';

const USERS_ROUTE = Express.Router();

USERS_ROUTE.use("/read", Read);
USERS_ROUTE.use("/auth", Auth);
USERS_ROUTE.use("/check", Check);

export default USERS_ROUTE;