const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const cors = require('cors');

const indexRouter = require('./routes/index');
const mainRouter = require('./routes/mainRouter');  // * import main router

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// * Set up cors
app.use(cors());

// * Set up mongoose connection
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // initialises dotenv
const mongoDB = "mongodb://mongo:DnhWnNuC3PJPfQcqPYSy@containers-us-west-21.railway.app:6738"
// const mongoDB = 'mongodb+srv://'+process.env.DB_USERNAME+':'+process.env.DB_PASSWORD+'@blog-api.meyotuc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// * Set up passportjs
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));

// Setup localstrategy functions
const User = require('./models/user'); // * Customise based on User model name
passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { 
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            // passwords match! log user in
            console.log('passwords match!')
            return done(null, user)
          } else {
            // passwords do not match!
            console.log('passwords do not match***')
            return done(null, false, { message: "Incorrect password" })
          }
        })
      }
    });
  })
);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Initialise passportjs
app.use(passport.initialize());
app.use(passport.session());
// Initialise other apps
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Save currennt user as 'user' variable
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// * VIEWS
// Import routers
app.use('/', indexRouter);
app.use('/', mainRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
