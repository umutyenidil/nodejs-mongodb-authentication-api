import jwt from 'jsonwebtoken';
import createError from "http-errors";
import env from "../../config/env.js";

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};

        const secret = env.ACCESS_TOKEN_SECRET;

        const options = {
            expiresIn: "15d",
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

const signRefreshToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};

        const secret = env.REFRESH_TOKEN_SECRET;

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

const verifyRefreshToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, env.REFRESH_TOKEN_SECRET, (error, payload) => {
            if (error) {
                reject(createError.Unauthorized());
            } else {
                const userId = payload.aud;

                resolve(userId);
            }
        });
    });
};


export {
    signAccessToken,
    verifyAccessToken,
    signRefreshToken,
    verifyRefreshToken,
};