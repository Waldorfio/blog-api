const Posts = require('../models/posts');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

module.exports = {
    posts_page,
    posts_create_get,
    posts_create_post,
    posts_read,
    posts_update,
    posts_destroy_get,
    posts_destroy_post,
}