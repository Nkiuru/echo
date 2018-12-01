const passport = require('passport');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: (path.join(__dirname, '../../dist/img/uploads')) });
const post = require('./posts');
const uploads = require('../modules/upload');

const initPost = (app) => {
  app.post('/post', passport.authenticationMiddleware(), createPost);
  app.post('/post/video', passport.authenticationMiddleware(), upload.single('video'), videoPost);
  app.post('/post/image', passport.authenticationMiddleware(), upload.array('images', 10), imagePost);
  app.post('/post/audio', passport.authenticationMiddleware(), upload.single('audio'), audioPost);
};

const createPost = (req, res, next) => {
  console.log(req.body);
  post.createTextPost(req.user.userId, req.body.postText).then((entityId) => {
    return post.getPost(entityId);
  }).then((textPost) => {
    console.log(textPost);
    res.json({
      success: true,
      text: textPost.text,
      timestamp: textPost.timestamp,
    });
    return res.end();
  }).catch((err) => {
    console.log(err);
    res.json({
      success: false,
      error: err,
    });
    next(err);
    return res.end();
  });
};

const videoPost = (req, res, next) => {
  uploads.createVideo(req, res, next).then((uploadId) => {
    post.createVideoPost(req.user.userId, uploadId, req.body.postText).then((entityId) => {
      console.log(entityId);
      return post.getPost(entityId);
    }).then((videoPost) => {
      console.log(videoPost);
      res.json([
        {
          success: true,
        }, videoPost]);
      return res.end();
    });
  }).catch((err) => next(err));
};

const audioPost = (req, res, next) => {
  uploads.createSong(req, res, next).then((songId) => {
    console.log(songId);
    post.createAudioPost(req.user.userId, songId, req.body.postText).then((entityId) => {
      return post.getPost(entityId);
    }).then((audioPost) => {
      console.log(audioPost);
      res.json([
        {
          success: true,
        }, audioPost]);
      return res.end();
    }).catch((err) => next(err));
  });
};

const imagePost = (req, res, next) => {
  uploads.createImageAlbum(req, res, next).then((imageAlbumId) => {
    req.imageAlbumId = imageAlbumId;
    return uploads.createImages(req, res, next);
  }).then(() => {
    return post.createImagePost(req.user.userId, req.imageAlbumId, req.body.postText);
  }).then((entityId) => {
    return post.getPost(entityId);
  }).then((imagePost) => {
    console.log(imagePost);
    res.json([
      {
        success: true,
      }, imagePost]);
    return res.end();
  }).catch((err) => next(err));
};

module.exports = initPost;
