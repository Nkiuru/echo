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

const getOwnPosts = (req, res) => {
  return new Promise((resolve, reject) => {
    const audio = db.getUserAudioPosts(req.user.userId);
    const video = db.getUserVideoPosts(req.user.userId);
    const text = db.getUserTextPosts(req.user.userId);
    const image = db.getUserImagePosts(req.user.userId);

    Promise.all([audio, text, video, image]).then((results) => {
      const posts = [];
      results.forEach((p) => {
        if (p.length > 0) {
          let id = 0;
          let first = true;
          let prev = {};
          let images = [];
          p.forEach((p) => {
            if (p.hasOwnProperty('imageAlbulmId')) {
              if (id !== p.imageAlbulmId) {
                id = p.imageAlbulmId;
                if (!first) {
                  posts.push({
                    entityId: prev.entityId,
                    imageAlbumId: prev.imageAlbulmId,
                    text: prev.text,
                    timestamp: prev.timestamp,
                    images: images,
                  });
                  images = [];
                }
                first = false;
              }
              images.push({
                title: p.title,
                description: p.description,
                fileName: p.fileName,
              });
              prev = p;
            } else {
              posts.push(p);
            }
          });
        }
      });
      posts.sort((a, b) => {
        const aDate = new Date(a.timestamp);
        const bDate = new Date(b.timestamp);
        if (aDate.getTime() < bDate.getTime()) {
          return 1;
        }
        if (aDate.getTime() > bDate.getTime()) {
          return -1;
        }
        return 0;
      });
      console.log(posts);
      resolve(posts);
    }).catch((err) => reject(err));
  });
};

module.exports = {
  createUser: createUser,
  getUser: getUser,
  getOwnData: getOwnData,
  changePassword: changePassword,
  getOwnPosts,
};
