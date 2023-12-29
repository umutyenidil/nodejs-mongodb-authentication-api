import {comparePassword} from '../../utilities/helpers/password.js';

const isValidPassword = async function (password) {
    try {
        return await comparePassword({
            password: password,
            truePassword: this.password
        });
    } catch (error) {
        throw error;
    }
};

export {
    isValidPassword,
};