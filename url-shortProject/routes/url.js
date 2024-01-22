const express = require('express');
const { handleGenerateNewShortUrl, handleRedirectUrl, handleToGetAnalytics} = require('../controllers/url')
const router = express.Router();
// const URL = require('../models/url');
// const ejs = require('ejs')

router.post('/', handleGenerateNewShortUrl);

router.get('/:shortId', handleRedirectUrl);
router.get('/analytics/:shortId', handleToGetAnalytics);



module.exports = router;