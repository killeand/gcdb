import Express from 'express';
import Path from 'path';
import FS from 'fs';
import _ from 'lodash';

import DataRoot from './data/Main';
import NotFound from './data/EndpointNotFound';
import ContentRequest from './data/ContentRequest';

const ROUTES = Express.Router();

ROUTES.use("/data", ContentRequest);
ROUTES.use("/data/v1", DataRoot);
ROUTES.use("/data", NotFound);

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