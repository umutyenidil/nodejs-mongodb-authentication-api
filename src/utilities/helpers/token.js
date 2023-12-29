import jwt from 'jsonwebtoken';
import createError from "http-errors";
import env from "../../config/env.js";

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};

        const secret = env.ACCESS_TOKEN_SECRET;

        const options = {
            expiresIn: "1h",
            issuer: 'test@test.com',
            audience: userId,

        };

        jwt.sign(payload, secret, options, (error, token) => {
            if (error) reject(error);

            resolve(token);
        });
    });
};

export {
    signAccessToken,
};