import Express from 'express';

import DBSetup from './DBSetup';
import UsersRoot from './users/Main';

const DATA_ROUTES = Express.Router();

DATA_ROUTES.use(DBSetup);
DATA_ROUTES.use("/users", UsersRoot);

export default DATA_ROUTES;