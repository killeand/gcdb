import Express from 'express';

import Read from './Read';
import Auth from './Auth';
import Check from './Check';

const USERS_ROUTE = Express.Router();

USERS_ROUTE.use("/read", Read);
USERS_ROUTE.use("/auth", Auth);
USERS_ROUTE.use("/check", Check);

export default USERS_ROUTE;