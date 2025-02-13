const mongoose = require ('mongoose');
const hashtagSchema = mongoose.Schema({
    hashtag: String,
    counter: Number,
})
const  Hashtags = mongoose.model('hashtags', hashtagSchema)
module.exports = Hashtags;