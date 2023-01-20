const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    username: { type: String, required: true },
    date: { type: Date, required: false, default: Date.now },
    text: { type: String, required: true },
})

// Export model
module.exports = mongoose.model("Message", MessageSchema);