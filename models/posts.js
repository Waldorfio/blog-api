const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    date: { type: Date, required: false, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
})

// Export model
module.exports = mongoose.model("Posts", PostsSchema);