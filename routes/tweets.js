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
        firstName: req.body.firstName,
        username: req.body.username,
        token: req.body.token,
        likesCounter: 0,
        likers: [],
    })
    newTweet.save().then((data) => {
        res.json(data)
    })
})

/* DELETE tweets/deleteOne */
router.delete('/deleteOne/:id', (req, res) => {
    Tweet.deleteOne({ _id: req.params.id})
    .then(() => {
        Tweet.find().then((data) => {
            res.json({ data });
        })
    })
})


module.exports = router;
