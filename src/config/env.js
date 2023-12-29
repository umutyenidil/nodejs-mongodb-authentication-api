import dotenv from 'dotenv';

dotenv.config();

const env = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    DB_ADDRESS: process.env.DB_ADDRESS || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'auth_test_db',
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || '0853c05706bd01f7a663ed922ff80769c1644ab9c0a7070b9ce4d4c84ea99c89',
    REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || '5312fc0d1e7ea584c7395c851e78d267e02ef41cbee28ca0053b8b02b35ca427',
};

export default env;