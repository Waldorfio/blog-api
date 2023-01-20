const Message = require('../models/message');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

module.exports = {
    msgs_page,
    msg_create_get,
    msg_create_post,
    msg_read,
    msg_update,
    msg_destroy_get,
    msg_destroy_post,
}