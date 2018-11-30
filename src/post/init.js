const passport = require('passport');
const db = require('../modules/database.js');

const initPost = (app) => {
  app.post('/post', passport.authenticationMiddleware(), createPost);
};

const createPost = (req, res) => {
  db.createEntity(req.user.userId)
    .then((result) => {
      const entityId = result[0]['LAST_INSERT_ID()'];
      console.log(entityId);
      db.createTextPost(entityId, req.body.postText)
        .then((result) => {
          db.getTextPost(entityId).then((data) => {
            console.log(data);
            res.json({
              success: true,
              text: req.body.postText,
              timestamp: data[0].timestamp,
            });
            return res.end();
          });
        })
        .catch((err) => {
          res.json({
            success: false,
            error: err,
          });
          return res.end();
        });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err,
      });
      return res.end();
    });
};

module.exports = initPost;
