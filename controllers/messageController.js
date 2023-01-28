const Msg = require('../models/message');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

// Render all posts
const msgs_page = async (req, res, next) => {
  try {
    const msgs = await Msg.find();
    res.send(msgs);
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// CREATE
const msg_create = [
  // Validate & sanitize


  // Run async callback
  async (req, res) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        const newMsg = await Msg.create(
          { _id: req.params.id },
          {
              post: req.body.post, // TODO: need to make sure this is referenced properly in front-end
              username: req.body.user, // TODO: need to make sure this is referenced properly in front-end
              date: req.body.date,
              text: req.body.text,
          });
        console.log('Msg created! ('+newMsg+')');
        res.send('Msg created');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// READ
const msg_read = async (req, res) => {
  try {
    const msg = await Msg.findById(req.params.id);
    res.send(msg);
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// UPDATE
const msg_update = [
  // Validate & sanitize


  // Run async callback
  async (req, res) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        const newMsg = await Msg.findByIdAndUpdate(
          { _id: req.params.id },
          {
              post: req.body.post,
              username: req.body.user,
              date: req.body.date,
              text: req.body.text,
          });
        console.log('Msg updated! ('+newMsg+')');
        res.send('Msg updated');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// DESTROY
const msg_destroy = async (req, res) => {
    try {
        const foundMsg = await Msg.findByIdAndDelete(req.params.id);
        console.log('Msg deleted! '+foundMsg);
        res.send('Msg destroyed');
    } catch(err) {
        console.error(err);
        res.redirect('error', err);
    }
}

module.exports = {
    msgs_page,
    msg_create,
    msg_read,
    msg_update,
    msg_destroy,
}
