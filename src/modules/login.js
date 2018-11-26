'use strict';

const express = require('express');
const uuid = require('uuid/v4');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const db = require('./database');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

// configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  {usernameField: 'username'},
  (username, password, done) => {
    db.getgetUserWPassword(username)
      .then((result) => {
        if (result.length > 0) {
          const user = result[0];
          if (user.length > 0) {
            return done(null, false, {message: 'Invalid credentials.\n'});
          }
          bcrypt.compare(password, user.password)
            .then((result) => {
              if (result) return done(null, user.userId);
              return done(null, false, {message: 'Invalid credentials.'});
            });
        } else {
          return done(null, false, {message: 'Invalid credentials.\n'});
        }
      })
      .catch((error) => done(error));
  }));

// tell passport how to serialize the user
passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((id, done) => {
  db.getUserById(id)
    .then((res) => done(null, res[0]))
    .catch((error) => done(error, false));
});

// create the server
const app = module.exports = express();

// add & configure middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
  genid: (req) => {
    return uuid(); // use UUIDs for session IDs
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (info) {
      return res.send(info.message);
    }
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      console.log('userId:' + user + ' successfully logged in');
      return res.redirect('auth');
    });
  })(req, res, next);
});

app.get('/auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('you hit the authentication endpoint');
  } else {
    console.log('no authenticated');
  }
});
