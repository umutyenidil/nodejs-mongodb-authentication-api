import UserModel from "../models/user/user.js";
import validationErrorHandler from "../utilities/error-handlers/validation.js";

const postRegister = async (req, res) => {
    try {
        const {emailAddress, password} = req.body;

        const newUser = new UserModel({
            emailAddress,
            password,
        });

        const result = await newUser.save();

        return res.status(201).json(newUser);
    } catch (error) {
        const validationErrors = validationErrorHandler(error);
        if (validationErrors) {
            return res.status(400).json(validationErrors);
        }


        return res.status(500).json({
            message: error.message,
        });
    }
};

const postLogin = async (req, res) => {
    try {

    } catch (error) {

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