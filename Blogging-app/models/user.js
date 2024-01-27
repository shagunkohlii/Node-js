const { Schema, model } = require("mongoose");
const { createHmac, randomBytes } = require('crypto');
const { error } = require("console");

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
        dafault: '/images/avatar.webp'
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

userSchema.static('matchPassword', async function (email, password) {
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
    return user;
})

const USER = model('user', userSchema)

module.exports = USER;