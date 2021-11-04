import { RateLimiterMemory } from 'rate-limiter-flexible';

const RateLimiter = new RateLimiterMemory({
    points: 12,
    duration: 1
});

const RateLimiterMiddleware = (req, res, next) => {
    RateLimiter.consume(req.ip, 2).then(() => {
        next();
    }).catch(() => {
        res.status(429).send("Too many requests");
    });
}

export default RateLimiterMiddleware;