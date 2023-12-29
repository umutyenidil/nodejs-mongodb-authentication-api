import jwt from 'jsonwebtoken';
import createError from "http-errors";
import env from "../../config/env.js";

const generateSignAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};

        const secret = env.ACCESS_TOKEN_SECRET;

        const options = {
            expiresIn: "1h",
            issuer: 'test@test.com',
            audience: userId,

        };

        jwt.sign(payload, secret, options, (error, token) => {
            if (error) {
                console.log(error.message);
                reject(createError.InternalServerError());
            }

            resolve(token);
        });
    });
};

const verifyAccessToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, env.ACCESS_TOKEN_SECRET, (error, payload) => {
            if (error) {
                reject(error);
            } else {
                resolve(payload);
            }
        });
    });
};

export {
    generateSignAccessToken,
    verifyAccessToken,
};