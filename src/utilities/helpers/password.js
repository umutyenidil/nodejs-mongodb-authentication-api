import bcrypt from 'bcrypt';

const encodePassword = async (password) => {
    const generatedSalt = await bcrypt.genSalt(10);

    return await bcrypt.hash(password, generatedSalt);
};

const comparePassword = async ({password, truePassword}) => {
    return await bcrypt.compare(password, truePassword);
};

export {
    encodePassword,
    comparePassword,
};