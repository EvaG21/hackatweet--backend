var express = require('express');
var router = express.Router();
require('../models/connection');
const Tweet = require("../models/tweets");

/* GET tweets/all */
router.get("/all", (req, res) => {
    Tweet.find().then(data => {
        res.json(data);
    })
});


/* POST tweets/add */
router.post('/add', (req, res) => {
    const newTweet = new Tweet({
        description: req.body.description,
        date: req.body.date,
        creator: req.body.username,
        likesCounter: 0,
        likers: [],
    })
    newTweet.save().then((data) => {
        res.json(data)
    })
})

module.exports = router;
