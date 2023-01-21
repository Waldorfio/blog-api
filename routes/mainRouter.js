const express = require('express');
const router = express.Router();
const passport = require("passport");

// Require controllers
const postsController = require('../controllers/postsController');
const msgController = require('../controllers/messageController');
const userController = require('../controllers/userController');

// * BLOG POST ROUTES
// SHOW ALL
router.get('/allposts', postsController.posts_page); // TODO: Change route to index page for all blog posts
// CREATE
router.get('/post/create', postsController.posts_create_get); // redirect to create form
router.post('/post/create', postsController.posts_create_post);
// READ
router.get('/post/:id', postsController.posts_read);
// UPDATE
router.post('/post/:id', postsController.posts_update);
// DESTROY
router.get('/post/:id/delete', postsController.posts_destroy_get); // redirect to delete page, asking to confirm deletion
router.post('/post/:id/delete', postsController.posts_destroy_post); // process delete.js submit button

// * POST MESSAGE ROUTES
// TODO Fix routes below (conflicting id's maybe?)
// SHOW ALL
router.get('/allmsgs', msgController.msgs_page); // TODO: Change route to index page for all blog posts
// CREATE
router.get('/post/:id/msg/create', msgController.msg_create_get); // redirect to create form
router.post('/post/:id/msg/create', msgController.msg_create_post);
// READ
router.get('/post/:id/msg/:id', msgController.msg_read);
// UPDATE
router.post('/post/:id/msg/:id', msgController.msg_update);
// DESTROY
router.get('/post/:id/msg/:id/delete', msgController.msg_destroy_get); // redirect to delete page, asking to confirm deletion
router.post('/post/:id/msg/:id/delete', msgController.msg_destroy_post); // process delete.js submit button


// * USER ROUTES
// SHOW ALL
router.get('/allusers', userController.users_page); // render page of all users
// CREATE
router.post('/user/create', userController.user_create);
// READ
router.get('/user/:id', userController.user_read);
// UPDATE
router.post('/user/:id', userController.user_update);
// DESTROY
router.post('/user/:id/delete', userController.user_destroy); // process delete.js submit button

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
