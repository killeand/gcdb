import Express from 'express';

import List from './List';

const USERS_ROUTE = Express.Router();

USERS_ROUTE.use("/list", List);

export default USERS_ROUTE;