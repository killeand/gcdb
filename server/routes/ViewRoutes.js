import FS from 'fs';
import Path from 'path';
import Express from 'express';

const VIEW_ROUTES = Express.Router();

VIEW_ROUTES.get(/^[^\.]*$/, (req, res, next) => {
    res.sendFile(Path.resolve('./build/main.html'));

    return;
});

VIEW_ROUTES.get(/^.*$/, (req, res, next) => {
    if (FS.existsSync(Path.resolve("./build" + req.path))) {
        res.sendFile(Path.resolve("./build" + req.path));

        return;
    }
    else {
        res.redirect(404, "/404");

        return;
    }
});

export default VIEW_ROUTES;