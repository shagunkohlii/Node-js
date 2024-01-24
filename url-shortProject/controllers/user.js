const User = require('../models/user');
const { v4: uuidv4 } = require('uuid')
const { setUser, getUser } = require('../service/auth')


async function handleSignup(req, res) {
    const { userName, email, password } = req.body;
    await User.create({
        userName,
        email,
        password,
    });
    return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password,
    });
    if (!user) {
        return res.render('login', {
            error: "invalid Username or Password.",
        })
    }
    const token = setUser(user)
    // res.cookie('uid', token);
    res.json({ token })
    // res.redirect('/')
}

module.exports = ({
    handleSignup,
    handleUserLogin,
})