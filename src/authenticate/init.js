'use strict';

const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../modules/database');
const authenticationMiddleware = require('./middleware');

// configure passport.js to use the local strategy
const initPassport = () => {
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
                if (result) {
                  console.log(username + ' logged in');
                  return done(null, user.userId);}
                return done(null, false, {message: 'Invalid credentials.'});
              });
          } else {
            return done(null, false, {message: 'Invalid credentials.\n'});
          }
        })
        .catch((error) => done(error));
    }));
  passport.authenticationMiddleware = authenticationMiddleware;
};

passport.serializeUser((userId, done) => {
  done(null, userId);
});

passport.deserializeUser((id, done) => {
  db.getUserById(id)
    .then((res) => done(null, res[0]))
    .catch((error) => done(error, false));
});

module.exports = initPassport;
