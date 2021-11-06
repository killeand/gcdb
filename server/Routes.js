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
    let path = req.path;
    let reserved_paths = ["images"];
    let changed = false;

    for (let i = 0; i < reserved_paths.length; i++) {
        let regex = new RegExp(`^(.*)${reserved_paths[i]}(.*)$`);

        if (regex.test(path)) {
            let index = path.indexOf(reserved_paths[i]);
            path = path.substr(index - 1);
            changed = true;
        }
    }

    if (!changed) {
        let index = path.lastIndexOf("/");

        path = path.substr(index);
    }

    if (FS.existsSync(Path.resolve("./build" + path))) {
        res.sendFile(Path.resolve("./build" + path));
        return;
    }
    else {
        res.redirect(404, "/404");
        return;
    }
});

export default ROUTES;