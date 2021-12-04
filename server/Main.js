import FS from 'fs';
import HTTPs from 'https';
import Express from 'express';
import Session from 'express-session';
import MongoStore from 'connect-mongo';
import Mongoose from 'mongoose';
import Helmet from 'helmet';

import RateLimiter from './middleware/RateLimiter.js';
import Routes from './Routes.js';
import SecretManager from "./SecretManager.js";

(new SecretManager()).Get();
const EXPRESS_APP = Express();
const PORT = 4000;
const SSL_CERTS = { key: FS.readFileSync('./ssltls/key.pem', 'utf8'), cert: FS.readFileSync('./ssltls/cert.pem', 'utf8') }
const MONGO_STRING = "mongodb://gcdb:gcdb@10.50.10.5:27000/gcdb?authSource=admin";
// const SESSION_DATA = Session({
//     name: "GCDBC",
//     secret: "$2y$12$/PUHAESr9opxIaWE.x6e3.xmiTUnkr/BQwgNOg7uwviEy8zSfqci2",
//     resave: false,
//     saveUninitialized: false,
//     store: MongoStore.create({
//         mongoUrl: MONGO_STRING,
//         collectionName: "Sessions",
//         crypto: {
//             secret: "$2y$12$BVIsGB3pgMlgz3gles4JoefdaRBGhlNnnbhqEmOK4G7ohGc10r0R."
//         }
//     }),
//     cookie: {
//         secure: true,
//         httpOnly: true,
//         domain: "localhost",
//         path: "/",
//         maxAge: 24 * 60 * 60 * 1000
//     }
// });

HTTPs.createServer(SSL_CERTS, EXPRESS_APP).listen(PORT, (error) => {
    if (error) {
        console.error(`Could not bind ExpressJs to port ${PORT}.`);
        return;
    }
    else {
        console.info(`ExpressJs is running on port ${PORT}. Access it at: https://localhost:${PORT}/`);
    }
});

Mongoose.connect(MONGO_STRING, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        console.error(`Could not connect to MongoDB: ${MONGO_STRING}.\n\n${error}`);
        return;
    }
    else {
        console.info(`Connected to MongoDB on ${Mongoose.connection.host}.`);
    }
});

EXPRESS_APP.use(Helmet({
    contentSecurityPolicy: false
}));
EXPRESS_APP.use(RateLimiter);
// EXPRESS_APP.use(SESSION_DATA);
EXPRESS_APP.use(Routes);