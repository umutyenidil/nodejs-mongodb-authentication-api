import passwordHelper from "../../utilities/password-helper.js";

const preSave = async function (next) {
    this.password = await passwordHelper.encodePassword(this.password);

    next();
};

export {
    preSave,
};