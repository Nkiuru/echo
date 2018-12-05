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
      'SELECT userId, username, displayName, countryId, city, bio, isAdmin, profileImageId, bandId' +
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
      'SELECT userId, username, displayName, countryId, city, bio, email, isAdmin, profileImageId, bandId' +
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
      'SELECT userId, username, displayName, countryId, city, bio, email, isAdmin, profileImageId, bandId' +
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
        if (results) resolve(results.insertId);
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

const updateUsrData = (data) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      'UPDATE user SET displayName = ?, bio = ?, city = ?, profileImageId = ?, email = ? WHERE userId = ?', data,
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
      `SELECT tp.*, u.username, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = tp.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = tp.entityId) AS likes, 
      u.displayName, uf.fileName as userImg 
      FROM entity e, textPost tp, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
      WHERE tp.entityId = ? AND tp.entityId = e.entityId AND u.userId = e.userId`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getUserTextPosts = (userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT tp.*, u.username, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = tp.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = tp.entityId) AS likes, 
      u.displayName, uf.fileName as userImg 
      FROM entity e, textPost tp, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
      WHERE e.userId = ? AND tp.entityId = e.entityId AND u.userId = e.userId`,
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
      `SELECT vp.*, upload.fileName, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = vp.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = vp.entityId) AS likes, 
      u.username, u.displayName, uf.fileName as userImg FROM entity e, videoPost vp, upload, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId WHERE vp.entityId = ? AND vp.entityId = e.entityId 
      AND vp.uploadId = upload.uploadId AND u.userId = e.userId`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getUserVideoPosts = (userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT vp.*, upload.fileName, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = vp.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = vp.entityId) AS likes, 
      u.username, u.displayName, uf.fileName as userImg FROM entity e, videoPost vp, upload, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId WHERE e.userId = ? AND vp.entityId = e.entityId 
      AND vp.uploadId = upload.uploadId AND u.userId = e.userId`,
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
      `SELECT ap.*, song.title, upload.fileName, genre.genreName, band.bandName, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = ap.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = ap.entityId) AS likes, 
      u.displayName, uf.fileName as userImg 
      FROM entity e, audioPost ap, song, upload, genre, band, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
      WHERE ap.entityId = ? AND ap.entityId = e.entityId 
      AND ap.songId = song.songId AND song.uploadId = upload.uploadId 
      AND song.genreId = genre.genreId AND band.bandId = song.bandId`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getUserAudioPosts = (userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT ap.*, song.title, upload.fileName, genre.genreName, band.bandName, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = ap.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = ap.entityId) AS likes, 
      u.displayName, uf.fileName as userImg 
      FROM entity e, audioPost ap, song, upload, genre, band, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
      WHERE e.userId = ? AND ap.entityId = e.entityId AND ap.songId = song.songId AND song.uploadId = upload.uploadId 
      AND song.genreId = genre.genreId AND band.bandId = song.bandId`,
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
        imageAlbulmId,
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
      `SELECT ip.*, image.title, image.description, upload.fileName, 
       (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = ip.entityId) AS dislikes, 
       (SELECT COUNT(userId) FROM likedEntity WHERE entityId = ip.entityId) AS likes, 
       u.username, u.displayName, uf.fileName as userImg FROM entity e, imagePost ip, image, upload,
       user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
       WHERE ip.entityId = ? AND ip.entityId = e.entityId 
       AND image.imageAlbulmId = ip.imageAlbulmId AND image.uploadId = upload.uploadId AND u.userId = e.userId`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getUserImagePosts = (userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT ip.*, image.title, image.description, upload.fileName, 
       (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = ip.entityId) AS dislikes, 
       (SELECT COUNT(userId) FROM likedEntity WHERE entityId = ip.entityId) AS likes, 
       u.username, u.displayName, uf.fileName as userImg FROM entity e, imagePost ip, image, upload,
       user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
       WHERE e.userId = ? AND ip.entityId = e.entityId 
       AND image.imageAlbulmId = ip.imageAlbulmId AND image.uploadId = upload.uploadId AND u.userId = e.userId`,
      [userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createUpload = (userId, fileName, filesize, thumbnail) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO upload(uploadId, userId, timestamp, fileName, filesize, thumbnail )
      VALUES(0, ?, NOW(), ?, ?, ?)`, [userId, fileName, filesize, thumbnail],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results.insertId);
      });
  });
};

const createAlbum = (albumName, coverImageId, bandId, description) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO album(albumId, albumName, coverImageId, bandId, description)
      VALUES(0, ?, ?, ?, ?)`, [albumName, coverImageId, bandId, description],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results.insertId);
      });
  });
};

const createSong = (title, albumId, genreId, uploadId, bandId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO song(songId, title, albumId, genreId, uploadId, bandId)
      VALUES(0, ?, ?, ?, ?, ?)`, [title, albumId, genreId, uploadId, bandId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results.insertId);
      });
  });
};

const createBand = (bandName, description, genreId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO band(bandId, bandName, description, genreId)
      VALUES(0, ?, ?, ?)`, [bandName, description, genreId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results.insertId);
      });
  });
};

const createImage = (title, uploadId, description, imageAlbumId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO image(uploadId, title, description, imageAlbulmId)
      VALUES(?, ?, ?, ?)`, [uploadId, title, description, imageAlbumId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createImageAlbum = (title, description) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO imageAlbum(imageAlbulmId)
      VALUES(0)`, [],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results.insertId);
      });
  });
};

const createComment = (entityId, userId, text) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO entityComment(commentId, entityId, comment, parentCommentId, userId, timestamp)
      VALUES(0, ?, ?, NULL, ?, NOW())`, [entityId, text, userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results.insertId);
      });
  });
};

const getAllImagePosts = () => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT ip.*, image.title, image.description, upload.fileName, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = ip.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = ip.entityId) AS likes, 
      u.username, u.displayName, uf.fileName as userImg FROM entity e, imagePost ip, image, upload,
       user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId WHERE ip.entityId = e.entityId 
       AND image.imageAlbulmId = ip.imageAlbulmId AND image.uploadId = upload.uploadId AND u.userId = e.userId`,
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const createSubComment = (entityId, text, commentId, userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO entityComment(commentId, entityId, comment, parentCommentId, userId, timestamp)
      VALUES(0, ?, ?, ?, ?, NOW())`, [entityId, text, commentId, userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results.insertId);
      });
  });
};

const getAllVideoPosts = () => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT vp.*, upload.fileName, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = vp.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = vp.entityId) AS likes, 
      u.username, u.displayName, uf.fileName as userImg FROM entity e, videoPost vp, upload, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId WHERE vp.entityId = e.entityId 
      AND vp.uploadId = upload.uploadId AND u.userId = e.userId`,
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getComment = (commentId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT entityComment.*, u.displayName, uf.fileName as userImg 
      FROM entityComment, user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
      WHERE entityComment.commentId = ? AND entityComment.userId = u.userId`,
      [commentId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getAllTextPosts = () => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT tp.*, u.username, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = tp.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = tp.entityId) AS likes, 
      u.displayName, uf.fileName as userImg 
      FROM entity e, textPost tp, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
      WHERE tp.entityId = e.entityId AND u.userId = e.userId`,
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getComments = (entityId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT entityComment.* , u.displayName, uf.fileName as userImg 
      FROM entityComment, user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
      WHERE entityComment.entityId = ? AND entityComment.userId = u.userId`,
      [entityId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getAllAudioPosts = () => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT ap.*, song.title, upload.fileName, genre.genreName, band.bandName, 
      (SELECT COUNT(userId) FROM dislikedEntity WHERE entityId = ap.entityId) AS dislikes, 
      (SELECT COUNT(userId) FROM likedEntity WHERE entityId = ap.entityId) AS likes, 
      u.displayName, uf.fileName as userImg 
      FROM entity e, audioPost ap, song, upload, genre, band, 
      user u LEFT JOIN upload uf ON uf.uploadId = u.profileImageId 
      WHERE ap.entityId = e.entityId AND ap.songId = song.songId AND song.uploadId = upload.uploadId 
      AND song.genreId = genre.genreId AND band.bandId = song.bandId`,
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const addDislike = (entityId, userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO dislikedEntity(entityId, userId)
      VALUES(?, ?)`, [entityId, userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const addLike = (entityId, userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `INSERT INTO likedEntity(entityId, userId)
      VALUES(?, ?)`, [entityId, userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getLike = (entityId, userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT * FROM likedEntity WHERE entityId = ? AND userId = ?;`, [entityId, userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const getDislike = (entityId, userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `SELECT * FROM dislikedEntity WHERE entityId = ? AND userId = ?;`, [entityId, userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const deleteLike = (entityId, userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `DELETE FROM likedEntity WHERE entityId = ? AND userId = ?;`, [entityId, userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

const deleteDislike = (entityId, userId) => {
  return new Promise((resolve, reject) => {
    connection.execute(
      `DELETE FROM dislikedEntity WHERE entityId = ? AND userId = ?;`, [entityId, userId],
      (err, results) => {
        if (err) reject(err);
        if (results) resolve(results);
      });
  });
};

module.exports = {
  connection,
  select,
  getCountries,
  getUser,
  getUserWPassword,
  getUserById,
  createUser,
  getUserByIdWEmail,
  createEntity,
  createTextPost,
  changePassword,
  getTextPost,
  getUserTextPosts,
  createVideoPost,
  getVideoPost,
  getUserVideoPosts,
  createAudioPost,
  getAudioPost,
  getUserAudioPosts,
  createImagePost,
  getImagePost,
  getUserImagePosts,
  createUpload,
  createAlbum,
  createSong,
  createBand,
  createImageAlbum,
  createImage,
  getAllImagePosts,
  getAllVideoPosts,
  getAllTextPosts,
  getAllAudioPosts,
  addDislike,
  addLike,
  getLike,
  getDislike,
  deleteDislike,
  deleteLike,
  updateUsrData, createComment,
  createSubComment,
  getComment,
  getComments,
};
