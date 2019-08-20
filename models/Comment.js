const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: String,
    like: Boolean
})

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;