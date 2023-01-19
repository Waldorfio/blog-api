const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    membership: { type: Boolean, default: false },
    admin: { type: Boolean, required: true, default: false },
})

// Export model
module.exports = mongoose.model("User", UserSchema);
