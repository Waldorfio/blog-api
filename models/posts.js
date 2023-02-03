const mongoose = require('mongoose');
const { DateTime } = require("luxon"); //for date handling

const Schema = mongoose.Schema;

const PostsSchema = new Schema({
    date: { type: Date, required: false, default: Date.now },
    title: { type: String, required: true },
    content: { type: String, required: true },
})

PostsSchema.virtual("date_formatted").get(function () {
    return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

// Export model
module.exports = mongoose.model("Posts", PostsSchema);