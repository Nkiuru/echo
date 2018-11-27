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
        console.log(req.body.username + ' created');
        res.render('index');
      }).catch((err) => {
        console.log(err);
        res.send({error: err});
      });
    }).catch((err) => {
      console.log(err);
    });
  } else {
    res.send({error: 'passwords do not match'});
  }
};
module.exports = {
  createUser: createUser,
};
