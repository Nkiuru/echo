const db = require('./database');
const path = require('path');
const fs = require('fs');
const uploadPath = path.join(__dirname, '../../dist/img/uploads');

const createUpload = (req, res, next) => {
  return new Promise((resolve, reject) => {
    db.createUpload(req.user.userId, req.file.filename, req.file.size, null).then((result) => {
      resolve(result);
    }).catch((err) => reject(err));
  });
};

const validateImages = (req, res, next) => {
  if (req.hasOwnProperty('files')) {
    req.files.forEach((file) => {
      console.log(file);
      if (file.mimetype.split('/')[0] !== 'image') {
        req.files.splice(req.files.indexOf(file), 1);
        fs.unlink(path.join(uploadPath, file.filename));
      }
    });
  }
};

const validateAudio = (req, res, next) => {
  if (req.hasOwnProperty('file')) {
    console.log(req.file);
    if (req.file.mimetype.split('/')[0] !== 'audio') {
      fs.unlink(path.join(uploadPath, req.file.filename));
      next('Invalid file');
    }
  }
};

const validateVideo = (req, res) => {
  if (req.hasOwnProperty('file')) {
    console.log(req.file);
    if (req.file.mimetype.split('/')[0] !== 'video') {
      fs.unlink(path.join(uploadPath, req.file.filename));
    }
  }
};

const createAlbum = (req, res, next) => {

};

const createSong = (req, res, next) => {
  return new Promise((resolve, reject) => {
    // validateAudio(req, res, next);
    createUpload(req, res, next).then((uploadId) => {
      return db.createSong(req.file.filename, null, req.body.genreId, uploadId, req.user.bandId);
    }).then((songId) => {
      resolve(songId);
    }).catch((err) => reject(err));
  });
};

const createImageAlbum = (req, res, next) => {
  return new Promise((resolve, reject) => {
    db.createImageAlbum().then((imageAlbumId) => {
      resolve(imageAlbumId);
    }).catch((err) => reject(err));
  });
};

const createVideo = (req, res, next) => {
  return new Promise((resolve, reject) => {
    // validateVideo(req, res);
    createUpload(req, res, next).then((uploadId) => {
      resolve(uploadId);
    }).catch((err) => reject(err));
  });
};

const createImage = (req, file) => {
  return new Promise((resolve, reject) => {
    db.createUpload(req.user.userId, file.filename, file.size, null).then((uploadId) => {
      return db.createImage(file.filename, uploadId, '', req.imageAlbumId);
    }).then(() => resolve()
    ).catch((err) => reject(err));
  });
};

const createImages = (req, res, next) => {
  return new Promise((resolve, reject) => {
    const promises = [];
    req.files.forEach((file) => {
      promises.push(createImage(req, file));
    });
    Promise.all(promises).then(() => {
      resolve();
    }).catch((err) => reject(err));
  });
};

module.exports = {
  createUpload: createUpload,
  createVideo: createVideo,
  createSong: createSong,
  createAlbum: createAlbum,
  createSong: createSong,
  createImageAlbum: createImageAlbum,
  createImages: createImages,
};
