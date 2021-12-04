import Express from 'express';

import DBSetup from '../middleware/DBSetup.js';

import AuthLogin from './auth/Login.js';
import AuthLogout from './auth/Logout.js';
import AuthRefresh from './auth/Refresh.js';

import UsersRead from './users/Read.js';

const ROUTES = Express.Router();
ROUTES.use("/setup", DBSetup);
ROUTES.use("/auth/login", AuthLogin);
ROUTES.use("/auth/logout", AuthLogout);
ROUTES.use("/auth/refresh", AuthRefresh);
ROUTES.use("/users/read", UsersRead);
export default ROUTES;