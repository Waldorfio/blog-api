const express = require('express');
const router = express.Router();
const passport = require("passport");

// Require controllers
const postsController = require('../controllers/postsController');
const msgController = require('../controllers/messageController');
const userController = require('../controllers/userController');

// * BLOG POST ROUTES
router.get('/posts', postsController.posts_page); // show all posts on the homepad
router.post('/posts/create', postsController.posts_create); // CREATE
router.get('/posts/:id', postsController.posts_read); // READ
router.put('/posts/:id', postsController.posts_update); // UPDATE
router.delete('/posts/:id/delete', postsController.posts_destroy); // DESTROY

// * POST MESSAGE ROUTES
router.get('/posts/:id', msgController.msgs_page); // show all messages on an individual post
router.post('/posts/:id/msg/create', msgController.msg_create); // CREATE
router.get('/posts/:id/msg/:id', msgController.msg_read); // READ
router.put('/posts/:id/msg/:id', msgController.msg_update); // UPDATE
router.delete('/posts/:id/msg/:id/delete', msgController.msg_destroy); // DESTROY

// * USER ROUTES
router.get('/users', userController.users_page); // render page of all users
router.post('/users/create', userController.user_create); // CREATE
router.get('/users/:id', userController.user_read); // READ
router.put('/users/:id', userController.user_update); // UPDATE
router.delete('/users/:id/delete', userController.user_destroy); // DESTROY

// * LOGIN ROUTES
// LOG IN
router.post("/log-in", 
    passport.authenticate("local", { successRedirect: "/", failureRedirect: "/", failureMessage: true }),
);
// LOG OUT
router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

module.exports = router;
