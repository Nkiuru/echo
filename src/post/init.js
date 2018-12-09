'use strict';
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
  app.post('/post/comment', passport.authenticationMiddleware(), comment);
  app.get('/post/:entityId', passport.authenticationMiddleware(), getPost);
  app.get('/trending', getImages);
  app.post('/post/like', passport.authenticationMiddleware(), likePost);
  app.post('/post/dislike', passport.authenticationMiddleware(), dislikePost);
  app.delete('/post/delete/:entityId', passport.authenticationMiddleware(), deletePost);
  app.delete('/post/comment/:commentId', passport.authenticationMiddleware(), deleteComment);
};

const deletePost = (req, res) => {
  if (req.user.isAdmin === 1) {
    post.deletePost(req.params.entityId).then(() => {
      res.json({ success: true });
      res.end();
    }).catch((err) => {
      res.json({ success: false, error: err });
      res.end();
    });
  } else {
    res.json({ success: false, error: 'VERBOTEN!' });
    res.end();
  }
};

const deleteComment = (req, res) => {
  if (req.user.isAdmin === 1) {
    post.deleteComment(req.params.commentId).then(() => {
      res.json({ success: true });
      res.end();
    }).catch((err) => {
      res.json({ success: false, error: err });
      res.end();
    });
  } else {
    res.json({ success: false, error: 'VERBOTEN!' });
    res.end();
  }
};

const likePost = (req, res) => {
  console.log(req.body);
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
  let userId = null;
  if (req.isAuthenticated()) {
    userId = req.user.userId;
  }
  post.getAllPosts(userId).then((results) => {
    res.json({
      success: true,
      posts: results,
    });
    res.end();
  }).catch((err) => res.send(err));
};

const textPost = (req, res, next) => {
  post.createTextPost(req.user.userId, req.body.postText).then((entityId) => {
    return post.getPost(entityId);
  }).then((textPost) => {
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
      // console.log(videoPost);
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

const comment = (req, res, next) => {
  if (req.body.hasOwnProperty('entityId')) {
    if (req.body.hasOwnProperty('parentCommentId')) {
      post.createSubComment(req.body.entityId, req.body.commentText, req.body.parentCommentId, req.user.userId).
        then((commentId) => {
          return post.getComment(commentId);
        }).
        then((comment) => {
          res.json([
            {
              success: true,
            }, comment]);
          res.end();
        }).catch((err) => next(err));
    } else {
      post.createComment(req.body.entityId, req.body.commentText, req.user.userId).then((commentId) => {
        return post.getComment(commentId);
      }).then((comment) => {
        res.json([
          {
            success: true,
          }, comment]);
      }).catch((err) => next(err));
    }
  }
};

const getPost = (req, res, next) => {
  post.getPost(req.params.entityId).then((post) => {
    res.json([
      { success: true },
      post]);
    res.end();
  });
};

module.exports = initPost;
