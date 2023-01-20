const Message = require('../models/message');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

const msgs_page = async (req, res, next) => {}
const msg_create_get = async (req, res, next) => {}
const msg_create_post = async (req, res, next) => {}
const msg_read = async (req, res, next) => {}
const msg_update = async (req, res, next) => {}
const msg_destroy_get = async (req, res, next) => {}
const msg_destroy_post = async (req, res, next) => {}

module.exports = {
    msgs_page,
    msg_create_get,
    msg_create_post,
    msg_read,
    msg_update,
    msg_destroy_get,
    msg_destroy_post,
}