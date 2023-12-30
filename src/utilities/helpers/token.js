import jwt from 'jsonwebtoken';
import createError from "http-errors";
import env from "../../config/env.js";
import {client as redisClient} from "../initializers/redis.js";

const signAccessToken = (userId) => {
    return new Promise((resolve, reject) => {
        const payload = {};

        const secret = env.ACCESS_TOKEN_SECRET;

        const options = {
            expiresIn: "12h",
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
            expiresIn: "15d",
            issuer: 'test@test.com',
            audience: userId,

        };

        jwt.sign(payload, secret, options, (error, token) => {
            if (error) {
                console.log(error.message);
                reject(createError.InternalServerError());
            }

            redisClient.SET(userId, token, 'EX', 15 * 24 * 60 * 60, (err, reply) => {
                if (err) {
                    console.log(err.message);
                    reject(createError.InternalServerError());
                    return;
                }

                resolve(token);
            });
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

                redisClient.GET(userId, (err, result) => {
                    if (err) {
                        console.log(err.message);
                        reject(createError.InternalServerError());
                        return;
                    }

                    if(token !== result){
                        reject(createError.Unauthorized());
                        return;
                    }

                    resolve(userId);
                });
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