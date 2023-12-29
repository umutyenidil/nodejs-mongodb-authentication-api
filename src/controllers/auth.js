import createError from "http-errors";

import UserModel from "../models/user/user.js";
import validationErrorHandler from "../utilities/error-handlers/validation.js";
import userValidation from "../utilities/validations/auth.js";
import {signAccessToken} from "../utilities/helpers/token.js";


const postRegister = async (req, res, next) => {
    try {
        const {emailAddress, password} = req.body;

        // if (!emailAddress || !password) throw createError.BadRequest();
        const validationResult = await userValidation.registerValidator.validateAsync(req.body);
        console.log(validationResult);

        const doesExists = await UserModel.findOne({emailAddress: emailAddress});

        if (doesExists) throw createError.Conflict(`${emailAddress} has already been taken`);

        const newUser = new UserModel({
            emailAddress,
            password,
        });

        const user = await newUser.save();

        const accessToken = await signAccessToken(user.id);

        return res.status(201).json({
            accessToken,
        });
    } catch (error) {
        // const validationErrors = validationErrorHandler(error);
        // if (validationErrors) {
        //     return res.status(400).json(validationErrors);
        // }

        if (error.isJoi === true) {
            error.status = 422;
        }

        next(error);
    }
};

const postLogin = async (req, res, next) => {
    try {
        const result = await userValidation.loginValidator.validateAsync(req.body);

        const user = await UserModel.findOne({emailAddress: result.emailAddress});

        if(!user) throw createError.NotFound("user not registered");

        const isMatch = await user.isValidPassword(result.password);

        if(!isMatch) throw createError.Unauthorized('email address or password not valid');

        const accessToken = await signAccessToken(user.id);

        res.send({accessToken});

    } catch (error) {
        if (error.isJoi === true) {
            next(createError.BadRequest('Invalid email address or password'));
        }

        next(error);
    }
};

const postLogout = async (req, res) => {
    try {

    } catch (error) {

    }
};

const postRefreshToken = async (req, res) => {
    try {

    } catch (error) {

    }
}


const authenticationController = {
    postRegister,
    postLogin,
    postLogout,
    postRefreshToken,
};

export default authenticationController;