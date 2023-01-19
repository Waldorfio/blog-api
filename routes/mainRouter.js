const express = require('express');
const router = express.Router();
const passport = require("passport");

// Require controllers
const userController = require('../controllers/userController');

// * USER ROUTES
// SHOW ALL
router.get('/allusers', userController.users_page); // render page of all users
// CREATE
router.get('/user/create', userController.user_create_get); // redirect to user create form
router.post('/user/create', userController.user_create_post);
// READ
router.get('/user/:id', userController.user_read);
// UPDATE
router.post('/user/:id', userController.user_update);
// DESTROY
router.get('/user/:id/delete', userController.user_destroy_get); // redirect to delete page, asking to confirm deletion
router.post('/user/:id/delete', userController.user_destroy_post); // process delete.js submit button

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
