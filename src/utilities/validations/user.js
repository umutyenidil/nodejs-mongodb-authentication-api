import joi from 'joi';

const authSchema = joi.object({
    emailAddress: joi.string().email().lowercase().required(),
    password: joi.string().min(6).required(),
});


const userValidation = {
    registerValidator: authSchema,

}

export default userValidation;