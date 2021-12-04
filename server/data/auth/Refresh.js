import Express from 'express';
import GetUserDetails from '../../middleware/GetUserDetails.js';

const ROUTE = Express.Router();

ROUTE.get(/^.*$/, GetUserDetails(), Express.json(), (req, res, next) => {
    res.status(200).json(res.locals.UserDetails);
});

export default ROUTE;