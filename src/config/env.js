import dotenv from 'dotenv';

dotenv.config();

const env = {
    PORT: process.env.PORT || 3000,
    HOST: process.env.HOST || 'localhost',
    DB_ADDRESS: process.env.DB_ADDRESS || 'mongodb://localhost:27017',
    DB_NAME: process.env.DB_NAME || 'auth_test_db',
};

export default env;