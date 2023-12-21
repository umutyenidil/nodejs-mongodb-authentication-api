import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

mongoose.connect(process.env.DB_ADDRESS)
    .then((_) => server.listen(process.env.PORT))
    .catch((error) => console.log(error));


