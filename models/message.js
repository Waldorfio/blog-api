const mongoose = require('mongoose');
const { DateTime } = require("luxon"); //for date handling

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    postid: { type: String, required: true }, // id of the associated post
    username: { type: String, required: true }, // username of user
    date: { type: Date, required: false, default: Date.now }, // The date of the message posted
    text: { type: String, required: true },
})

MessageSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATETIME_SHORT);
});

// Export model
module.exports = mongoose.model("Message", MessageSchema);
