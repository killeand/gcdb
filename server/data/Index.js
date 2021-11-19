import Express from 'express';

import DBSetup from '../middleware/DBSetup.js';
import UsersRoot from './users/Index.js';

const DATA_ROUTES = Express.Router();

DATA_ROUTES.use("/setup", DBSetup());
DATA_ROUTES.use("/users", UsersRoot);

export default DATA_ROUTES;