const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    description: String,
    date: Date,
    creator: String,
    likesCounter: Number,
    likers: [String],
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;