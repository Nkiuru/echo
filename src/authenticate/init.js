'use strict';

const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../modules/database');
const authenticationMiddleware = require('./middleware');

/*
* configure passport.js to use the local strategy
* Get the user with username and check if the password hashes match using bcrypt.
* Returns an error message if the credentials do not match
*/
const initPassport = () => {
  passport.use(new LocalStrategy(
    { usernameField: 'username' },
    (username, password, done) => {
      db.getUserWPassword(username)
        .then((result) => {
          if (result.length > 0) {
            const user = result[0];
            if (!user) {
              return done(null, false, { message: 'Invalid credentials.' });
            }
            bcrypt.compare(password, user.password)
              .then((result) => {
                if (result) {
                  console.log(username + ' logged in');
                  return done(null, user.userId);
                }
                return done(null, false, { message: 'Invalid credentials.' });
              });
          } else {
            return done(null, false, { message: 'Invalid credentials.' });
          }
        })
        .catch((error) => done(error));
    }));
  passport.authenticationMiddleware = authenticationMiddleware;
};

/*
* Serialize user using the userId.
 */
passport.serializeUser((userId, done) => {
  done(null, userId);
});

/*
* Deserialize user and attach the user to each request with all user data except password
 */
passport.deserializeUser((id, done) => {
  db.getUserByIdWEmail(id)
    .then((res) => done(null, res[0]))
    .catch((error) => done(error, false));
});

module.exports = initPassport;
