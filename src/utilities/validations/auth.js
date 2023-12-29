import joi from 'joi';

const registerSchema = joi.object({
    emailAddress: joi.string().email().lowercase().required(),
    password: joi.string().min(6).required(),
});

const loginSchema = joi.object({
    emailAddress: joi.string().email().lowercase().required(),
    password: joi.string().required(),
});


const userValidation = {
    registerValidator: registerSchema,
    loginValidator: loginSchema,
}

export default userValidation;