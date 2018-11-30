'use strict';
const passport = require('passport');
const users = require('./users');

const initUser = (app) => {
  app.get('/', renderWelcome);
  app.get('/users', passport.authenticationMiddleware(), testAuth);
  app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.error('Login error', err);

        res.json({
          success: false,
          error: 'Something went wrong...',
        });
        return res.end();
      }

      if (!user) {
        res.json({
          success: false,
          error: info.message || 'Something went wrong...',
        });
        return res.end();
      }

      req.logIn(user, (err) => {
        console.log(user);
        if (err) {
          console.error('Login acccept error', err);

          res.json({
            success: false,
            error: 'Something went wrong...',
          });
          return res.end();
        }

        res.json({success: true});
        return res.end();
      });
    })(req, res, next);
  });
  app.post('/register', addUser);
  app.get('/user/:username', passport.authenticationMiddleware(), getUser);
  app.get('/users/user', passport.authenticationMiddleware(), getOwnData);
  app.get('/users/:userId', passport.authenticationMiddleware(), getUserData);
  app.post('/user/pwd', passport.authenticationMiddleware(), updatePassword);
};

const renderWelcome = (req, res) => {
  res.render('index');
};

const testAuth = (req, res) => {
  res.render('users');
};

const addUser = (req, res, next) => {
  users.createUser(req, res);
};

const getUser = (req, res) => {
  res.render('profile');
};

const getUserData = (req, res) => {
  if (req.params.hasOwnProperty('userId')) {
    users.getUser(req, res);
  } else {
    res.end();
  }
};

const getOwnData = (req, res) => {
  users.getOwnData(req, res);
};

const updatePassword = (req, res) => {
  users.changePassword(req, res);
};
module.exports = initUser;
