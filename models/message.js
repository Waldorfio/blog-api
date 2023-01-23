const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: false, default: Date.now },
    text: { type: String, required: true },
    admin: { type: Boolean, required: true, default: true },
})

// Export model
module.exports = mongoose.model("Message", MessageSchema);
