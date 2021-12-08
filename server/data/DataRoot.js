import Express from 'express';
import UserPerms from '../UserPerms.js';
import RateLimit from '../middleware/RateLimiter.js';
import DBSetup from '../middleware/DBSetup.js';
import ReqAuth from '../middleware/RequireAuthorization.js';
import ReqPerm from '../middleware/RequirePermissions.js';
import AuthLogin from './auth/Login.js';
import AuthLogout from './auth/Logout.js';
import AuthRefresh from './auth/Refresh.js';
import UsersRead from './users/Read.js';

const ROUTES = Express.Router();
ROUTES.use("/setup", RateLimit(6, 1), ReqAuth, ReqPerm(UserPerms.Admin), DBSetup);
ROUTES.use("/auth/login", RateLimit(3, 1), AuthLogin);
ROUTES.use("/auth/logout", RateLimit(3, 1), AuthLogout);
ROUTES.use("/auth/refresh", RateLimit(3, 1), AuthRefresh);
ROUTES.use("/users/read", RateLimit(6, 1), ReqAuth, ReqPerm(UserPerms.Admin | UserPerms.UserManage), UsersRead);
export default ROUTES;