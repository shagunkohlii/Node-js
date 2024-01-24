const shortid = require('shortid');
const URL = require('../models/url');


async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body || !body.url) { return res.status(400).json({ error: " body is required" }) };
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        // req.user._id is the same id of the user.
        createdBy: req.user._id,
    });
    // return res.json({ id: shortID });
    return res.render("home", {
        id: shortID,
    })
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
        }
    )
    if (!entry) {
        // Handle the case where the entry was not found
        return res.status(404).send('URL not found');
    }
    return res.redirect(entry.redirectUrl);
}

async function handleToGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    return res.json({ totalClicks: result.visitHistory.length, analytics: result.visitHistory, UrlName: result.redirectUrl })
}


module.exports = {
    handleGenerateNewShortUrl,
    handleRedirectUrl,
    handleToGetAnalytics,
}