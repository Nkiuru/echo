'use strict';
const passport = require('passport');

const initUser = (app) => {
  app.get('/', renderWelcome);
  app.get('/users', passport.authenticationMiddleware(), testAuth);
  app.post('/login', passport.authenticate('local', {
    successRedirect: 'users',
    failureRedirect: 'node/',
  }));
  app.post('/users', addUser);
};

const renderWelcome = (req, res) => {
  res.render('node/');
};

const testAuth = (req, res) => {
  res.render('users');
};

const addUser = (req, res, next) => {
  const users = require('./users');
  users.createUser(req, res);
};

module.exports = initUser;
