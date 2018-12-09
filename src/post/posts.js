const db = require('../modules/database');

const createEntity = (userId) => {
  return new Promise((resolve, reject) => {
    db.createEntity(userId).then((result) => {
      resolve(result);
    }).catch((err) => reject(err));
  });
};

const createTextPost = (userId, text) => {
  return new Promise((resolve, reject) => {
    createEntity(userId).then((entityId) => {
      db.createTextPost(entityId, text).
        then(() => resolve(entityId)).
        catch((err) => reject(err));
    });
  });
};

const createVideoPost = (userId, uploadId, text) => {
  return new Promise((resolve, reject) => {
    createEntity(userId).then((entityId) => {
      db.createVideoPost(entityId, uploadId, text).
        then(() => resolve(entityId)).
        catch((err) => reject(err));
    });
  });
};

const createImagePost = (userId, albumId, text) => {
  return new Promise((resolve, reject) => {
    createEntity(userId).then((entityId) => {
      db.createImagePost(entityId, albumId, text).
        then(() => resolve(entityId)).
        catch((err) => reject(err));
    });
  });
};

const createAudioPost = (userId, songId, text) => {
  return new Promise((resolve, reject) => {
    createEntity(userId).then((entityId) => {
      db.createAudioPost(entityId, songId, text).
        then(() => resolve(entityId)).
        catch((err) => reject(err));
    });
  });
};

const getAllImagePosts = () => {
  return new Promise((res, rej) => {
    db.getAllImagePosts().then((results) => res(results)).catch(() => rej(err));
  });
};

const getAllPosts = (userId) => {
  return new Promise((resolve, reject) => {
    const audio = db.getAllAudioPosts();
    const video = db.getAllVideoPosts();
    const text = db.getAllTextPosts();
    const image = db.getAllImagePosts();

    Promise.all([audio, video, text, image]).then((results) => {
      // console.log(results);
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
        if (userId) {
          promises.push(new Promise((resolve, reject) => {
            db.getLike(post.entityId, userId).then((likes) => {
              post.like = likes[0];
              resolve();
            }).catch((err) => reject(err));
          }));
          promises.push(new Promise((resolve, reject) => {
            db.getDislike(post.entityId, userId).then((dislikes) => {
              post.dislike = dislikes[0];
              resolve();
            }).catch((err) => reject(err));
          }));
        }
      });
      Promise.all(promises).then((postsWithComments) => {
        resolve(postsWithComments.filter((x) => !!x));
      }).catch((err) => reject(err));
    }).catch((err) => reject(err));
  });
};

const resolvePosts = (results) => {
  const posts = [];
  results[0].forEach((audioPost) => { // audio posts
    posts.push(audioPost);
  });
  // console.log(posts);
  results[1].forEach((textPost) => { // text posts
    posts.push(textPost);
  });
  results[2].forEach((videoPost) => { // video posts
    posts.push(videoPost);
  });
  const imagePosts = results[3];
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

const getPost = (entityId) => {
  return new Promise((resolve, reject) => {
    const audio = db.getAudioPost(entityId);
    const video = db.getVideoPost(entityId);
    const text = db.getTextPost(entityId);
    const image = db.getImagePost(entityId);

    Promise.all([audio, text, video, image]).then((result) => {
      let post = [];
      result.forEach((p) => {
        if (p.length > 0) {
          if (p[0].hasOwnProperty('imageAlbulmId')) { // This is an image post with possibly many images.
            post = {
              entityId: p[0].entityId,
              imageAlbulmId: p[0].imageAlbulmId,
              text: p[0].text,
              timestamp: p[0].timestamp,
              username: p[0].username,
              displayName: p[0].displayName,
              userImg: p[0].userImg,
              likes: p[0].likes,
              dislikes: p[0].dislikes,
              images: [],
            };

            p.forEach((imagePost) => {
              if (imagePost.imageAlbulmId === post.imageAlbulmId) {
                post.images.push({
                  title: imagePost.title,
                  description: imagePost.description,
                  fileName: imagePost.fileName,
                });
              }
            });
          } else {
            post = p[0];
          }
        }
      });
      db.getComments(post.entityId).then((comments) => {
        post.comments = comments;
        resolve(post);
      }).catch((error) => reject(error));
    }).catch((err) => reject(err));
  });
};

const createComment = (entityId, text, userId) => {
  return new Promise((resolve, reject) => {
    if (text === '') {
      reject({ error: 'Empty comment' });
    } else {
      db.createComment(entityId, userId, text).then((commentId) => resolve(commentId)).catch((err) => reject(err));
    }
  });
};

const createSubComment = (entityId, text, commentId, userId) => {
  return new Promise((resolve, reject) => {
    if (text === '') {
      reject({ error: 'Empty comment' });
    } else {
      db.createSubComment(entityId, text, commentId, userId).
        then((commentId) => resolve(commentId)).
        catch((err) => reject(err));
    }
  });
};

const getComment = (commentId) => {
  return db.getComment(commentId);
};

const getComments = (entityId) => {
  return new Promise((resolve, reject) => {
    db.getComments(entityId).then((comments) => {
      // console.log(comments);
      resolve(comments);
    }).catch((err) => reject(err));
  });
};

const dislikePost = (entityId, userId) => {
  return new Promise((resolve, reject) => {
    db.getLike(entityId, userId).then((result) => {
      return db.deleteLike(entityId, userId);
    }).then(() => {
      return db.addDislike(entityId, userId);
    }).then(() => {
      resolve();
    }).catch((err) => reject(err));
    console.log('POST DISLIKED');
  });
};

const likePost = (entityId, userId) => {
  console.log(entityId, userId);
  return new Promise((resolve, reject) => {
    db.getDislike(entityId, userId).then((result) => {
      if (result.length > 0) {
        return db.deleteDislike(entityId, userId);
      }
    }).then(() => {
      return db.addLike(entityId, userId);
    }).then(() => {
      resolve();
    }).catch((err) => reject(err));
    console.log('POST LIKED');
  });
};

const getLike = (entityId, userId) => {
  return new Promise((resolve, reject) => {
    db.getLike(entityId, userId)
      .then((result) => {
        console.log(result);
      })
      .then(() => {
        resolve();
      })
      .catch((err) => reject(err));
  });
};


const deletePost = (entityId) => {
  return new Promise((resolve, reject) => {
    db.deletePost(entityId)
      .then(() => {
        console.log(entityId);
        resolve();
      })
      .catch((err) => reject(err));
  });
};

const deleteComment = (entityId) => {
  return new Promise((resolve, reject) => {
    db.deleteComment(entityId).then(() => resolve()).catch((err) => reject(err));
  });
};


module.exports = {
  createEntity: createEntity,
  createTextPost: createTextPost,
  createAudioPost: createAudioPost,
  createImagePost: createImagePost,
  createVideoPost: createVideoPost,
  getPost: getPost,
  createComment,
  createSubComment,
  getComment,
  getComments,
  getAllImagePosts,
  getAllPosts,
  dislikePost,
  likePost,
  deletePost,
  deleteComment,
  getLike,
};
