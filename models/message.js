const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true }, // To extract the id of the associated post
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // To extract the username and admin status from associated user
    date: { type: Date, required: false, default: Date.now }, // The date of the message posted
    text: { type: String, required: true },
})

// Export model
module.exports = mongoose.model("Message", MessageSchema);
