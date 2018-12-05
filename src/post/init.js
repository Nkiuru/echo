const passport = require('passport');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: (path.join(__dirname, '../../dist/uploads')) });
const post = require('./posts');
const uploads = require('../modules/upload');

const initPost = (app) => {
  app.post('/post', passport.authenticationMiddleware(), textPost);
  app.post('/post/video', passport.authenticationMiddleware(), upload.single('file'), videoPost);
  app.post('/post/image', passport.authenticationMiddleware(), upload.array('file', 10), imagePost);
  app.post('/post/audio', passport.authenticationMiddleware(), upload.single('file'), audioPost);
  app.get('/trending', getImages);
  app.post('/post/like', passport.authenticationMiddleware(), likePost);
  app.post('/post/dislike', passport.authenticationMiddleware(), dislikePost);
};

const likePost = (req, res) => {
  post.likePost(req.body.entityId, req.user.userId).then(() => {
    res.json({ success: true });
    res.end();
  }).catch((err) => {
    console.log(err);
    res.json({ success: false });
    res.end();
  });
};

const dislikePost = (req, res) => {
  post.dislikePost(req.body.entityId, req.user.userId).then(() => {
    res.json({ success: true });
    res.end();
  }).catch((err) => {
    console.log(err);
    res.json({ success: false });
    res.end();
  });
};
const getImages = (req, res) => {
  post.getAllPosts().then((results) => {
    res.json({
      success: true,
      posts: results,
    });
    res.end();
  }).catch((err) => res.send(err));
};

const textPost = (req, res, next) => {
  console.log(req.body);
  post.createTextPost(req.user.userId, req.body.postText).then((entityId) => {
    return post.getPost(entityId);
  }).then((textPost) => {
    // console.log(textPost);
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
  console.log(req.body);
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
    res.json([
      {
        success: true,
      }, imagePost]);
    // console.log('image post' + imagePost);
    return res.end();
  }).catch((err) => next(err));
};

module.exports = initPost;
