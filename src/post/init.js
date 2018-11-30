const passport = require('passport');
const multer = require('multer');
const path = require('path');
const upload = multer({ dest: (path.join(__dirname, '../../dist/img/uploads')) });
const post = require('./posts');

const initPost = (app) => {
  app.post('/post', passport.authenticationMiddleware(), createPost);
  app.post('/post/video', passport.authenticationMiddleware(), upload.single('files'), videoPost);
  app.post('/post/image', passport.authenticationMiddleware(), upload.array('images', 10), imagePost);
  app.post('/post/audio', passport.authenticationMiddleware(), upload.single('audio'), audioPost);
};

const createPost = (req, res, next) => {
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
  // Insert into upload the video file from front-end
  // Check if file is actually a video
};

const audioPost = (req, res, next) => {
  // Before getting the actual file, front-end will create necessary album
  // validate that the file is audio
};

const imagePost = (req, res, next) => {
  // Create album out of the uploaded file(s)
  // validate that the uploaded file is an image
};

module.exports = initPost;
