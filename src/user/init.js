'use strict';
const passport = require('passport');
const users = require('./users');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: (path.join(__dirname, '../../dist/uploads')) });
const db = require('../modules/database');
const uploadJs = require('../modules/upload');

/*
* List of API endpoints for all user related requests
*/
const initUser = (app) => {
  app.get('/', renderWelcome);

  /*
  * Endpoint for logining in
  * Returns success: true if credentials match
  */
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

        res.json({
          success: true,
        });
        return res.end();
      });
    })(req, res, next);
  });
  app.post('/register', addUser);
  app.post('/logout', passport.authenticationMiddleware(), logoutUser);
  app.get('/user/settings', passport.authenticationMiddleware(), (req, res) => {
    res.render('usersettings');
  });
  app.get('/user/:username', passport.authenticationMiddleware(), getUser);
  app.get('/users/user', passport.authenticationMiddleware(), getOwnData);
  app.get('/users/:username', passport.authenticationMiddleware(), getUserData);
  app.get('/users', passport.authenticationMiddleware(), testAuth);
  app.get('/user/posts/:username', passport.authenticationMiddleware(), getUserPosts);

  app.post('/user/pwd', passport.authenticationMiddleware(), updatePassword);
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/',
  }));
  app.post('/users', addUser);
  app.post('/user/settings', passport.authenticationMiddleware(), uploadUserDataNoFile);
  app.post('/user/settings/file', passport.authenticationMiddleware(), upload.single('mediafile'), uploadUserData);
};

const renderWelcome = (req, res) => {
  res.render('index');
};

const testAuth = (req, res) => {
  res.render('users');
};

/*
* Creates a new user
* Requires password, password2, username, displayName, countryId, city, and email
* Returns success: true if account was created successfully
*/
const addUser = (req, res, next) => {
  users.createUser(req, res);
};
/*
* Renders the user profile page
*/
const getUser = (req, res) => {
  res.render('profile', {
    // posts: results.map(x => ({ ...x, username: req.user.username })),
  });
};
/*
* Gets all posts made by the user
* Requires the username of the user
* User must be authenticated
* Returns all posts with relevant data
*/
const getUserPosts = (req, res) => {
  if (req.params.username) {
    users.getUserWithUsername(req.params.username).then((user) => {
      return users.getOwnPosts(user.userId);
    }).then((results) => {
      res.json({
        success: true,
        posts: results,
      });
      res.end();
    }).catch((err) => {
      console.log(err);
      res.json({ success: false });
      res.end();
    });
  }
};
/*
* Gets the user
* Requires the username of the user
* Returns user with all relevant data
*/
const getUserData = (req, res) => {
  if (req.params.hasOwnProperty('username')) {
    users.getUserWithUsername(req.params.username).then((user) => {
      res.json([{ success: true }, user]);
      res.end();
    }).catch((err) => {
      console.log(err);
      res.json({ success: false });
    });
  } else {
    res.end();
  }
};

/*
* Gets the user data of the requester
* User must be authenticated
* Returns all relevant user data except password
*/
const getOwnData = (req, res) => {
  if (req.user) {
    users.getOwnData(req, res);
  } else {
    res.json({ success: false });
    res.end();
  }
};

/*
* Changes the requester's password
* User must be authenticated
* Requires oldPassword and newPassword
* Returns a message if successfully updated
*/
const updatePassword = (req, res) => {
  users.changePassword(req, res);
};

/*
* Logs out the requester
* Clears the cookie
* Returns success: true if successful
*/
const logoutUser = (req, res) => {
  res.clearCookie('connect.sid');
  res.json({ success: true });
  req.logout();
  res.end();
};

/*
* Updates the user's data
* Requires displayName and email
* Bio or city if not given will be set to null
* Returns all relevant user data
*/
const uploadUserData = (req, res, next) => {
  uploadJs.createUpload(req, res, next).then((uploadId) => {
    const data = [
      req.user.displayName,
      req.user.bio || null,
      req.user.city || null,
      uploadId,
      req.user.email,
      req.user.userId,
    ];
    db.updateUsrData(data);
    console.log(data);
    res.send(data);
  }).catch((err) => console.log(err));
};

/*
* Updates the user's data
* Requires displayName, email and profile image
* Bio or city if not given will be set to null
* Returns all relevant user data
*/
const uploadUserDataNoFile = (req, res, next) => {
  console.log(req.body);
  const data = [
    req.body.displayName,
    req.body.bio,
    req.body.city,
  ];
  if (req.user.profileImageId) {
    data.push(req.user.profileImageId);
  } else {
    data.push(null);
  }
  data.push(req.body.email);
  data.push(req.user.userId);
  db.updateUsrData(data);
  console.log(data);
  res.send(data);
};

module.exports = initUser;
