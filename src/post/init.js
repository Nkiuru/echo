const passport = require('passport');
const db = require('../modules/database.js');

const initPost = (app) => {
  app.post('/post', testAuth);
};

const testAuth = (req, res) => {
  db.createEntity(req.user.userId)
    .then((result) => {
      const entityId = result[0]['LAST_INSERT_ID()'];
      console.log(entityId);
      // res.send(entityId);
      db.createTextPost(entityId, req.body.postText)
        .then((result) => {
          // res.send(result);
          res.json({success: true});
          return res.end();
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
