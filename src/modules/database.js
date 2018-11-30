'use strict';

const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

const select = () => {
  // simple query
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT userId, username, displayName, countryId, city, bio, email, isAdmin, profileImageId FROM user;',
      (err, results, fields) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createUser = (data) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'INSERT INTO user(' +
      'userId, username, password, displayName, countryId, city, bio, email, isAdmin, profileImageId)' +
      'VALUES (0, ?, ?, ?, ?, ?, NULL, ?, 0, NULL);',
      data,
      (err, results, fields) => {
        if (err) reject(err.code);
        if (results) resolve(results);
      });
  });
};

const getUserWPassword = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM user WHERE username = ?;', [username],
      (err, results) => {
        if (err) {
          reject(err.code);
        } else if (results) resolve(results);
      });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT userId, username, displayName, countryId, city, bio, isAdmin, profileImageId' +
      ' FROM user WHERE userId = ?;', [id], (err, results) => {
        if (err) {
          reject(err.code);
        } else if (results) resolve(results);
      });
  });
};

const getUserByIdWEmail = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT userId, username, displayName, countryId, city, bio, email, isAdmin, profileImageId' +
      ' FROM user WHERE userId = ?;', [id], (err, results) => {
        if (err) {
          reject(err.code);
        } else if (results) resolve(results);
      });
  });
};

const getUser = (username) => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT userId, username, displayName, countryId, city, bio, email, isAdmin, profileImageId' +
      ' FROM user WHERE username = ?;', [username], (err, results) => {
        if (err) {
          reject(err.code);
        } else if (results) resolve(results);
      });
  });
};

const getCountries = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM country;',
      (err, results, fields) => {
        if (err) {
          reject(err);
        }
        if (results) {
          resolve(results);
        }
      });
  });
};

const createEntity = (userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO entity(
        entityId,
        userId)
        VALUES (0, ?);`,
      [userId], (err, results, fields) => {
        if (err) reject(err);
        if (results) {
          connection.query(
            `SELECT LAST_INSERT_ID();`,
            ((err, results) => {
              if (err) reject(err);
              if (results) resolve(results);
            }));
        }
      });
  });
};

const changePassword = (newPwd, userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'UPDATE user SET password = ? WHERE userID = ?', [newPwd, userId],
      (err, results, fields) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createTextPost = (entityId, text) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO textPost(
        entityId,
        text,
        timestamp)
        VALUES(?, ?, NOW());`,
      [entityId, text],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getTextPost = (entityId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT * FROM textPost
      WHERE entityId = ?;`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getUserTextPosts = (userId) => {
  console.log(userId);
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT tp.* FROM entity e, textPost tp
      WHERE e.userId = ? AND tp.entityId = e.entityId`,
      [userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createVideoPost = (entityId, uploadId, text) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO videoPost(
        entityId,
        uploadId,
        text,
        timestamp)
        VALUES(?, ?, ?, NOW());`,
      [entityId, uploadId, text],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getVideoPost = (entityId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT * FROM videoPost
      WHERE entityId = ?;`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getUserVideoPosts = (userId) => {
  console.log(userId);
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT vp.* FROM entity e, videoPost vp
      WHERE e.userId = ? AND vp.entityId = e.entityId`,
      [userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createAudioPost = (entityId, songId, text) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO audioPost(
        entityId,
        songId,
        text,
        timestamp)
        VALUES(?, ?, ?, NOW());`,
      [entityId, songId, text],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getAudioPost = (entityId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT * FROM audioPost
      WHERE entityId = ?;`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getUserAudioPosts = (userId) => {
  console.log(userId);
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT tp.* FROM entity e, audioPost ap
      WHERE e.userId = ? AND ap.entityId = e.entityId`,
      [userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createImagePost = (entityId, albumId, text) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO imagePost(
        entityId,
        albumId,
        text,
        timestamp)
        VALUES(?, ?, ?, NOW());`,
      [entityId, albumId, text],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getImagePost = (entityId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT * FROM imagePost
      WHERE entityId = ?;`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getUserImagePosts = (userId) => {
  console.log(userId);
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT ip.* FROM entity e, imagePost ip
      WHERE e.userId = ? AND ip.entityId = e.entityId`,
      [userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

module.exports = {
  connection: connection,
  select: select,
  getCountries: getCountries,
  getUser: getUser,
  getgetUserWPassword: getUserWPassword,
  getUserById: getUserById,
  createUser: createUser,
  getUserByIdWEmail: getUserByIdWEmail,
  createEntity: createEntity,
  createTextPost: createTextPost,
  changePassword: changePassword,
  getTextPost: getTextPost,
  getUserTextPosts: getUserTextPosts,
  createVideoPost: createVideoPost,
  getVideoPost: getVideoPost,
  getUserVideoPosts: getUserVideoPosts,
  createAudioPost: createAudioPost,
  getAudioPost: getAudioPost,
  getUserAudioPosts: getUserAudioPosts,
  createImagePost: createImagePost,
  getImagePost: getImagePost,
  getUserImagePosts: getUserImagePosts,
};
