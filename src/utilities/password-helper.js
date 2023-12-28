import bcrypt from 'bcrypt';

const encodePassword = async (password) => {
    const generatedSalt = await bcrypt.genSalt();

    return await bcrypt.hash(password, generatedSalt);
};

export default {
    encodePassword
};