const shortid = require('shortid');
const URL = require('../models/url')

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body || !body.url) { return res.status(400).json({ error: " body is required" }) };
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
    });
    return res.json({ id: shortID });
}

async function handleRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },{ new : true}
        );
    return res.redirect(entry.redirectUrl);
}

module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectUrl,
}