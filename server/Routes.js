import Express from 'express';
import Path from 'path';
import FS from 'fs';
import _ from 'lodash';

import DataRoot from './data/Index';
import NotFound from './middleware/EndpointNotFound';
import CTRequire from './middleware/ContentTypeRequire';

const ROUTES = Express.Router();

ROUTES.use("/data", CTRequire());
ROUTES.use("/data/v1", DataRoot);
ROUTES.use("/data", NotFound());

ROUTES.get(/^[^\.]*$/, (req, res, next) => {
    res.sendFile(Path.resolve('./build/main.html'));
    return;
});

ROUTES.get(/^.*$/, (req, res, next) => {
    if (FS.existsSync(Path.resolve("./build" + req.path))) {
        res.sendFile(Path.resolve("./build" + req.path));
        return;
    }
    else {
        res.redirect(404, "/404");
        return;
    }
});

export default ROUTES;