const express = require('express');
const { handleGenerateNewShortUrl, handleRedirectUrl, handleToGetAnalytics} = require('../controllers/url')
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);

router.get('/:shortId', handleRedirectUrl);
router.get('/analytics/:shortId', handleToGetAnalytics);

module.exports = router;