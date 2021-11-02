import Express from 'express';

import Read from './Read';
import Auth from './Auth';

const USERS_ROUTE = Express.Router();

USERS_ROUTE.use("/read", Read);
USERS_ROUTE.use("/auth", Auth);

export default USERS_ROUTE;