const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
},
    // timestamps shows the created and updated time of a user.
    { timestamps: true });

const User = mongoose.model("user", userSchema);

module.exports = User;