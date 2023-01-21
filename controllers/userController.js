const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

// Render all users
const users_page = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(Object.values(users));
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// CREATE
const user_create = [
  // Validate & sanitize
  body('username').isLength({ min: 1 }).withMessage('username must be at least 1 character'),
  body('password').optional({checkFalsy:true}),
  
  // Run async callback
  async (req, res, next) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => { // * New bcryptjs line
            const newuser = User.create({
              username: req.body.username,
              password: hashedPassword,
              admin: req.body.admin,
            })
            console.log('user created! ('+newuser+')');
            res.send('User created')
        }) // * New bcryptjs line
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// READ
const user_read = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(Object.values(user))
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// UPDATE
const user_update = [
  // Validate & sanitize
  body('username').isLength({ min: 1 }).withMessage('username must be at least 1 character'),
  body('password').optional({checkFalsy:true}),

  // Run async callback
  async (req, res) => {
    const errors = validationResult(req); // Capture any validation errors parsed above
    if (!errors.isEmpty()) {
      console.error(errors.array());
      res.send('Validation Error: '+errors.array()[0].msg);
    } else {
      try {
        const newuser = await User.findByIdAndUpdate(
          { _id: req.params.id },
          {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              password: req.body.password,
              admin: req.body.admin
          });
        console.log('user updated! ('+newuser+')');
        res.send('User updated');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// DESTROY
const user_destroy = async (req, res) => {
    try {
        const founduser = await User.findByIdAndDelete(req.params.id);
        console.log('user deleted! '+founduser);
        res.send('User destroyed')
    } catch(err) {
        console.error(err);
        res.redirect('error', err);
    }
}

module.exports = {
    users_page,
    user_create,
    user_read,
    user_update,
    user_destroy,
}