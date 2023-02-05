const Posts = require('../models/posts');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

// Render all posts
const posts_page = async (req, res, next) => {
  try {
    const posts = await Posts.find();
    res.send(posts);
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// UPDATE
const posts_create = [
  // Validate & sanitize
  body('title').isLength({ min: 1 }).withMessage('title must be at least 1 character'),
  body('content').isLength({ min: 10 }).withMessage('content must be at least 10 characters'),

  // Run async callback
  async (req, res) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        const newPost = await Posts.create(
          { _id: req.params.id },
          {
              date: req.body.date,
              title: req.body.title,
              content: req.body.content,
          });
        console.log('Post create! ('+newPost+')');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// READ
const posts_read = async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    res.send(post);
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// UPDATE
const posts_update = [
  // Validate & sanitize
  body('title').isLength({ min: 1 }).withMessage('title must be at least 1 character'),
  body('content').isLength({ min: 10 }).withMessage('content must be at least 10 characters'),

  // Run async callback
  async (req, res) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        const newPost = await Posts.findByIdAndUpdate(
          { _id: req.params.id },
          {
              date: req.body.date,
              title: req.body.title,
              content: req.body.content,
          });
        console.log('Post updated! ('+newPost+')');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// DESTROY
const posts_destroy = async (req, res) => {
    try {
        const foundPost = await Posts.findByIdAndDelete(req.params.id);
        console.log('Post deleted! '+foundPost);
    } catch(err) {
        console.error(err);
        res.redirect('error', err);
    }
}

module.exports = {
    posts_page,
    posts_create,
    posts_read,
    posts_update,
    posts_destroy,
}
