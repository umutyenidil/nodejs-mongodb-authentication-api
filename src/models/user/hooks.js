import {encodePassword} from "../../utilities/helpers/password.js";

const preSave = async function (next) {
    try {
        this.password = await encodePassword(this.password);
        next();
    } catch (error) {
        next(error);
    }
};

const postSave = async function () {
    try {
        console.log('after user has saved');
        // next();
    } catch (error) {
        // next(error);
    }
};

export {
    preSave,
    postSave,
};