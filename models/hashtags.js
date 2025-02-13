const mongoose = require ('mongoose');
const hashtagSchema = mongoose.Schema({
    hashtag: String,
    counter: Number,
})
const  Hashtags= mongoose.model('', hashtagSchema)
module.exports = Hashtags;