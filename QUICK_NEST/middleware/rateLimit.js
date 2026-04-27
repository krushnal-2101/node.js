import rateLimit from "express-rate-limit"

export const ratelimiter = rateLimit({
    windowMs: 15*60*1000,
    limit: 500,
    message:"to many request from this ip, please tryb again-later after 15-min",
})

export const authlimiter = rateLimit({
    windowMs: 15*60*1000,
    limits:5,
    message:"to many request from this ip, please try again-later after 15-min",
})

