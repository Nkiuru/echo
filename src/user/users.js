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
      const bandData = [
        req.body.username,
        null,
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
      db.createBand(bandData).then(() => {
        res.json({ success: true });
        console.log(req.body.username + ' band created');
        return res.end();
      }).catch((err) => {
        console.log('ERROR CREATING BAND: ' + err);
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

const getUserWithUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.getUser(username).then((user) => {
      resolve(user);
    }).catch((err) => reject(err));
  });
};

const changePassword = (req, res) => {
  const oldPwd = req.body.password;
  db.getUserWPassword(req.user.username).then((result) => {
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

const getOwnPosts = (userId) => {
  return new Promise((resolve, reject) => {
    const audio = db.getUserAudioPosts(userId);
    const video = db.getUserVideoPosts(userId);
    const text = db.getUserTextPosts(userId);
    const image = db.getUserImagePosts(userId);

    Promise.all([audio, text, video, image]).then((results) => {
      const posts = resolvePosts(results);
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
      const promises = [];
      posts.forEach((post) => {
        promises.push(new Promise((resolve, reject) => {
          db.getComments(post.entityId).then((comments) => {
            post.comments = comments;
            resolve(post);
          }).catch((err) => reject(err));
        }));
      });
      Promise.all(promises).then((postsWithComments) => {
        resolve(postsWithComments);
      }).catch((err) => reject(err));
    }).catch((err) => reject(err));
  });
};

const resolvePosts =(results) => {
  const posts = [];
  results[0].forEach((audioPost) => { // audio posts
    posts.push(audioPost);
  });
  results[1].forEach((textPost) => { // text posts
    posts.push(textPost);
  });
  results[2].forEach((videoPost) => { // video posts
    posts.push(videoPost);
  });
  const imagePosts = results[3];
  // console.log(imagePosts);
  for (let i = 0; i < imagePosts.length; i++) {
    const lastItem = posts[posts.length - 1] || {};
    if (lastItem.hasOwnProperty('imageAlbulmId') && lastItem.imageAlbulmId === imagePosts[i].imageAlbulmId) {
      lastItem.images.push({
        title: imagePosts[i].title,
        description: imagePosts[i].description,
        fileName: imagePosts[i].fileName,
      });
    } else {
      const post = {
        entityId: imagePosts[i].entityId,
        imageAlbulmId: imagePosts[i].imageAlbulmId,
        text: imagePosts[i].text,
        timestamp: imagePosts[i].timestamp,
        username: imagePosts[i].username,
        displayName: imagePosts[i].displayName,
        userImg: imagePosts[i].userImg,
        likes: imagePosts[i].likes,
        dislikes: imagePosts[i].dislikes,
        images: [],
      };
      post.images.push({
        title: imagePosts[i].title,
        description: imagePosts[i].description,
        fileName: imagePosts[i].fileName,
      });
      posts.push(post);
    }
  }
  return posts;
};

module.exports = {
  createUser: createUser,
  getUser: getUser,
  getOwnData: getOwnData,
  changePassword: changePassword,
  getOwnPosts,
  getUserWithUsername,
};
