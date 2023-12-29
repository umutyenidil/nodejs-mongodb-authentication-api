import mongoose from 'mongoose';
import validator from 'validator';
import {postSave, preSave} from "./hooks.js";

const userSchema = new mongoose.Schema({
    emailAddress: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: [true, 'Email address already in use'],
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Password has to contain at least 6 characters'],
    },
});

userSchema.pre('save', preSave);
userSchema.post('save', postSave);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;