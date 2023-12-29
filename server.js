import express from 'express';
import morgan from 'morgan';
import createError from 'http-errors';
import mongoose from 'mongoose';
import './src/utilities/initializers/mongodb.js';

import {authenticationRoutes} from "./src/routes/authentication.js";
import env from "./src/config/env.js";


const server = express();

// middlewares
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(morgan('dev'));


server.use('/auth', authenticationRoutes);

server.use(async (req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

server.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

const port = env.PORT || 3000;
server.listen(port, (_) => {
    console.log(`Server running on port ${port}`);
});