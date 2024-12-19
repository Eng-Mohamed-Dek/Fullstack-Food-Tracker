const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // minlength: 8,
        // maxlength: 16,
    }
})

module.exports = mongoose.model('User' , userSchema)