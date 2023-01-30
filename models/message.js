const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    postid: { type: String, required: true }, // id of the associated post
    username: { type: String, required: true }, // username of user
    date: { type: Date, required: false, default: Date.now }, // The date of the message posted
    text: { type: String, required: true },
})

// Export model
module.exports = mongoose.model("Message", MessageSchema);
