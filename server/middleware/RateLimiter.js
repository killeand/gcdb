import { RateLimiterMemory } from 'rate-limiter-flexible';
import _ from 'lodash';

export default (points, duration) => {
    let RateLimiter = new RateLimiterMemory({
        points: (!_.isNil(points)) ? points : 12,
        duration: (!_.isNil(duration)) ? duration : 1
    });

    return (req, res, next) => {
        RateLimiter.consume(req.ip, 1).then(() => {
            next();
        }).catch(() => {
            res.status(429).json({error:"Too many requests"});
        });
    }
}