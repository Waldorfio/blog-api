const User = require('../models/user');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

// Render users page
const users_page = async (req, res, next) => {
  try {
    const users_list = await User.find();
    res.render('allusers', {
      currentuser: req.user,
      users: users_list,
    });
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}

// CREATE
const user_create_get = async (req, res) => {
  try {
    res.render('userform', { // Set placeholder values in create form
      type: 'Create',
      action:'/user/create',
    });
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }   
}
const user_create_post = [
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
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              password: hashedPassword,
              membership: false, // default membership should be false
              admin: req.body.admin,
            })
            console.log('user created! ('+newuser+')');
            res.redirect('/');
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
    const founduser = await User.findById(req.params.id);
    res.render('userform', {
      type: 'Update',
      action:'/user/'+founduser.id,
      firstname: founduser.firstname,
      lastname: founduser.lastname,
      username: founduser.username,
      password: founduser.password,
      admin: founduser.admin,
    })
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
        res.redirect('/allusers');
      } catch(err) {
        console.error(err);
        res.redirect('error', err);
      }
    }
  }
]

// DESTROY
const user_destroy_get = async (req, res) => {
  try {
    res.render('delete');
  } catch(err) {
    console.error(err);
    res.redirect('error', err);
  }
}
const user_destroy_post = async (req, res) => {
    try {
        const founduser = await User.findByIdAndDelete(req.params.id);
        console.log('user deleted! ('+founduser+')');
        res.redirect('/allusers');
    } catch(err) {
        console.error(err);
        res.redirect('error', err);
    }
}

module.exports = {
    users_page,
    user_create_get,
    user_create_post,
    user_read,
    user_update,
    user_destroy_get,
    user_destroy_post,
}