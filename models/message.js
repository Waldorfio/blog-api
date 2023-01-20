const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    username: { type: String, required: true },
    date: { type: Date, required: false, default: Date.now },
    text: { type: String, required: true },
    padmin: { type: Boolean, required: true, default: true },
})

// Export model
module.exports = mongoose.model("Message", MessageSchema);