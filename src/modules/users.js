'use strict';

const express = require('express');
const db = require('./database');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const saltRounds = 10;
const app = module.exports = express();
app.use(bodyParser.urlencoded({extended: true}));

app.post('/users', (req, res, next) => {
  // userId, username, password, displayName, countryId, city, bio, email, isAdmin, profileImageId
  console.log(req.body);

  const pwd = req.body.password;
  const pwd2 = req.body.password2;
  if (pwd === pwd2) {
    bcrypt.hash(pwd, saltRounds)
      .then((hash) => {
        req.body.password = hash;
        next();
      }).catch((err) => {
      console.log(err);
    });
  } else {
    res.send({error: 'passwords do not match'});
  }
});

app.use('/users', (req, res) => {
  const data = [
    req.body.username,
    req.body.password,
    req.body.displayName,
    req.body.countryId,
    req.body.city,
    req.body.email,
  ];
  db.createUser(data).then(() => {
    db.getUser(req.body.username).then((result) => {
      res.send(result);
    }).catch((err) => {
      console.log(err);
      res.send({error: err});
    });
  }).catch((err) => {
    console.log(err);
    res.send({error: err});
  });
});

