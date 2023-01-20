const Posts = require('../models/posts');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

const posts_page = async (req, res, next) => {}
const posts_create_get = async (req, res, next) => {}
const posts_create_post = async (req, res, next) => {}
const posts_read = async (req, res, next) => {}
const posts_update = async (req, res, next) => {}
const posts_destroy_get = async (req, res, next) => {}
const posts_destroy_post = async (req, res, next) => {}

module.exports = {
    posts_page,
    posts_create_get,
    posts_create_post,
    posts_read,
    posts_update,
    posts_destroy_get,
    posts_destroy_post,
}