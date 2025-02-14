var express = require("express");
var router = express.Router();
require("../models/connection");
const Tweet = require("../models/tweets");

/* GET tweets/all */
router.get("/all", (req, res) => {
  Tweet.find().then((data) => {
    res.json(data);
  });
});

/* POST tweets/add */
router.post("/add", (req, res) => {
  const newTweet = new Tweet({
    description: req.body.description,
    date: req.body.date,
    firstname: req.body.firstname,
    username: req.body.username,
    token: req.body.token,
    likesCounter: 0,
    likers: [],
  });
  newTweet.save().then((data) => {
    res.json(data);
  });
});

/* DELETE tweets/deleteOne */
router.delete("/deleteOne/:id", (req, res) => {
  Tweet.deleteOne({ _id: req.params.id }).then(() => {
    Tweet.find().then((data) => {
      res.json({ data });
    });
  });
});

/* LIKE tweets/like */
router.post("/like/:id", (req, res) => {
  Tweet.findOne({ _id: req.params.id }).then((data) => {
    if (data.likers.includes(req.body.username)) {
        Tweet.updateOne({ _id: req.params.id }, { $inc: {'likesCounter': -1}, likers: data.likers.filter(item => item !== req.body.username) })
        .then((data) => {
            res.json({
                result: true,
                Update: 'tweet unliked'
            })
        })
    } else {
        Tweet.updateOne({ _id: req.params.id }, { $inc: {'likesCounter': 1}, $push: { 'likers': req.body.username }})
        .then((data) => {
            res.json({
                result: true,
                Update: 'tweet liked'
            })
        })    }
  });
});

module.exports = router;
