const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require('crypto');
const { createTokenForUser } = require("../services/authentication");

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: '/images/avatar.webp', // Corrected typo here
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: "USER",
    },
}, { timestamps: true })


userSchema.pre('save', function (next) {
    const user = this;

    if (!user.isModified('password')) return;

    const salt = randomBytes(16).toString();

    const hashedPassword = createHmac('sha256', salt)
        .update(user.password)
        .digest('hex');
    // console.log(hash);
    this.salt = salt;
    this.password = hashedPassword;
    next();
})

userSchema.static('matchPasswordAndGenerateToken', async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) throw new Error('user not found!');
    console.log(user)

    const salt = user.salt;
    const hashedPassword = user.password;

    const userProvideHashPassword = createHmac('sha256', salt)
        .update(password)
        .digest('hex');

    if (hashedPassword !== userProvideHashPassword) {
        throw new Error('incorrect password')
    }
    // return user;
    const token = createTokenForUser(user);
    return token;
})

const USER = model('user', userSchema)

module.exports = USER;