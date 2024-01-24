const express = require('express');
const router = express.Router();
const {handleSignup, handleUserLogin} =require('../controllers/user')


router.post('/', handleSignup);
router.post('/login', handleUserLogin)

module.exports = router;