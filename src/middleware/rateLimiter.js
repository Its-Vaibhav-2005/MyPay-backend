import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try{
        const {success} = await ratelimit.limit(req.ip);
        if(!success){
            return res.status(429).json({
                msg: "Too many requests. Please try again later.",
                ip: req.ip
            });
        }
        next(); // Continue to the next middleware/route when rate limit passes
    }catch(err){
        console.log("Rate Limit Error: ", err);
        next(err);
    }
}

export default rateLimiter;