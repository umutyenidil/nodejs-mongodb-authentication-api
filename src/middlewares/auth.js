import createError from "http-errors";
import {verifyAccessToken} from "../utilities/helpers/token.js";

const checkAccessToken = async (req, res, next) => {
    try {
        if (!req.headers['authorization']) throw createError.Unauthorized();

        const headerAuthorization = req.headers['authorization'];
        const bearerToken = headerAuthorization.split(' ')[1];

        const payload = await verifyAccessToken(bearerToken);

        if (!payload) throw createError.Unauthorized();

        req.payload;

        next();

    } catch (error) {
        if (error.isJoi) {
            const message = error.name === 'JsonWebTokenError' ? 'Unauthorized' : message;

            next(createError.Unauthorized(message));
        }

        next(error);
    }


};

export {
    checkAccessToken,
};