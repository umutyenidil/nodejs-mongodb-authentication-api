import mongoose from "mongoose";
import env from "../../config/env.js";

mongoose.connect(
    env.DB_ADDRESS,
    {
        dbName: env.DB_NAME,
    },
)
    .then(() => {
        console.log('mongodb connected');
    })
    .catch((error) => {
        console.log('mongodb not connected');
        console.log(error);
    });

mongoose.connection.on('connected', () => {
    console.log('mongoose connected to db');
});

mongoose.connection.on('error', (error) => {
    console.log(error.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('mongoose disconnected to db');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
});