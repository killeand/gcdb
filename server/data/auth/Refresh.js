import Express from 'express';

const ROUTE = Express.Router();

ROUTE.get(/^.*$/, Express.json(), (req, res, next) => {
    res.status(200).json({blah:true});
});

export default ROUTE;