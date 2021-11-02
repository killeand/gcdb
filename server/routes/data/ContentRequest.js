import Express from 'express';

const ROUTE = Express.Router();

ROUTE.use(/^.*$/, Express.json(), (req, res, next) => {
    if (req.headers["content-type"] != "application/json") {
        res.status(400).contentType("application/json").send({"error": "Request must be supplied as a content type of application/json"});
        return;
    }
    
    next();
});

export default ROUTE;