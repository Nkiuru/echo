'use strict';

const db = require('../modules/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const createUser = (req, res) => {
  const pwd = req.body.password;
  const pwd2 = req.body.password2;
  if (pwd === pwd2) {
    bcrypt.hash(pwd, saltRounds).then((hash) => {
      req.body.password = hash;
      const data = [
        req.body.username,
        req.body.password,
        req.body.displayName,
        req.body.countryId,
        req.body.city,
        req.body.email,
      ];
      db.createUser(data).then(() => {
        res.json({ success: true });
        console.log(req.body.username + ' created');
        return res.end();
      }).catch((err) => {
        console.log('ERROR CREATING USER: ' + err);
        res.json({
          success: false,
          error: err,
        });
        return res.end();
      });
    }).catch((err) => {
      console.log(err);
    });
  } else {
    res.json({
      success: false,
      error: 'passwords do not match',
    });
    res.end();
  }
};

const getOwnData = (req, res) => {
  db.getUserByIdWEmail(req.user.userId).then((result) => {
    res.send(result[0]);
  }).catch((err) => {
    res.send({ error: err });
  });
};

const getUser = (req, res) => {
  db.getUserById(req.params.userId).then((result) => {
    res.send(result[0]);
  }).catch((err) => {
    res.send({ error: err });
  });
};

const changePassword = (req, res) => {
  const oldPwd = req.body.password;
  db.getgetUserWPassword(req.user.username).then((result) => {
    bcrypt.compare(oldPwd, result[0].password).then(() => {
      bcrypt.hash(req.body.newPassword, 10).then((result) => {
        db.changePassword(result, req.user.userId).then(() => {
          res.send({ message: 'password successfully updated' });
        }).catch((err) => {
          console.log(err);
          res.send({ error: err });
        });
      }).catch((err) => {
        console.log(err);
        res.send({ error: err });
      });
    }).catch((err) => {
      console.log(err);
      res.status(403).res.send({ error: err });
    });
  }).catch((err) => {
    res.send({ error: err });
  });
};

module.exports = {
  createUser: createUser,
  getUser: getUser,
  getOwnData: getOwnData,
  changePassword: changePassword,
};
