import Express from 'express';

import DBSetup from '../../middleware/DBSetup';
import UsersRoot from './users/Main';

const DATA_ROUTES = Express.Router();

DATA_ROUTES.use("/setup", DBSetup());
DATA_ROUTES.use("/users", UsersRoot);

export default DATA_ROUTES;