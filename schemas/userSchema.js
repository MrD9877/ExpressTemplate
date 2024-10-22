import mongoose from "mongoose";
const schema = new mongoose.Schema({
    name: {
        require: true,
        type: mongoose.Schema.Types.String,
        unique: true
    },
    password: {
        require: true,
        type: mongoose.Schema.Types.String
    }
});

export const User = mongoose.model('User', schema);