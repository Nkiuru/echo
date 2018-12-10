const feedContainer = document.querySelector('.feed-container');
const feed = document.createElement('div');
const loading = document.querySelector('#loading');
let authenticated = false;

let dislikeIcon = '';
let likeIcon = '';
let likeIconCircle = '';

let deleteComment = '';

const isAdmin = () => {
  const user = window.localStorage.getItem('userData');
  if (user) {
    const json = JSON.parse(user);
    if (json.isAdmin === 1) return true;
    if (json.isAdmin !== 1) return false;
  }
};

const deletePost = (postEntity) => {
  return fetch(`/post/delete/${postEntity}`, {
    method: 'delete',
  }).then((response) => response.json()).then((json) => {
    console.log(json);
  }).catch((err) => console.log(err));
};

const createLikes = () => {
  const likeIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  likeIconSvg.setAttribute('width', '24px');
  likeIconSvg.setAttribute('height', '24px');
  likeIconSvg.setAttribute('viewBox', '0 0 24 24');
  likeIconSvg.setAttribute('fill', 'none');
  likeIconSvg.setAttribute('stroke-width', '2');
  likeIconSvg.style.stroke = '#6C6E86';

  likeIconCircle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  likeIconCircle.setAttribute('d',
    `M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z`);

  const likeIconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  likeIconPath.setAttribute('d', 'M8 12L12 16L16 12');
  likeIconPath.setAttribute('stroke-linecap', 'round');
  likeIconPath.setAttribute('stroke-linejoin', 'round');

  const likePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  likePath.setAttribute('d', 'M12 8V16');
  likePath.setAttribute('stroke-linecap', 'round');
  likePath.setAttribute('stroke-linejoin', 'round');

  likeIconSvg.appendChild(likeIconCircle);
  likeIconSvg.appendChild(likeIconPath);
  likeIconSvg.appendChild(likePath);

  return likeIconSvg;
};

const createPost = (json, i) => {
  const singlePostContainer = document.createElement('div');
  singlePostContainer.classList.add('single-post-container');

  const postCard = document.createElement('div');
  postCard.id = 'post-card';

  const postHeader = document.createElement('div');
  postHeader.classList.add('post-header');

  const profileContainer = document.createElement('div');
  profileContainer.classList.add('profile-container');

  const userImg = document.createElement('img');

  if (json.posts[i].userImg) {
    userImg.setAttribute('src', `/static/uploads/${json.posts[i].userImg}`);
  } else {
    userImg.setAttribute('src', `/static/img/bbe.png`);
  }

  const usrTime = document.createElement('div');
  usrTime.classList.add('usr-time');

  const username = document.createElement('h4');
  username.textContent = json.posts[i].displayName;

  const timestamp = document.createElement('p');
  const timestampText = json.posts[i].timestamp;

  const m = moment.utc(timestampText, 'YYYY/MM/DD HH:mm:ss');

  timestamp.textContent = m.local().fromNow(timestampText);

  const moreBtn = document.createElement('div');
  moreBtn.classList.add('more-btn');
  moreBtn.style.backgroundImage = 'url(\'/static/img/more-vertical.svg\')';

  const morePopup = document.createElement('div');
  morePopup.classList.add('more-popup');
  const deleteThis = document.createElement('p');
  deleteThis.classList.add('delete-this');
  deleteThis.textContent = 'DELETE THIS';

  morePopup.appendChild(deleteThis);
  morePopup.style.display = 'none';

  moreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    morePopup.style.display = 'flex';
    morePopup.addEventListener('click', (e) => {
      const postEntity = json.posts[i].entityId;
      console.log(postEntity);
      deletePost(postEntity);
      singlePostContainer.classList.add('post-anime-out');
      setTimeout(() => {
        singlePostContainer.remove();
      }, 500);
    });
  });

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container');

  const text = document.createElement('p');
  text.textContent = json.posts[i].text;

  const votes = document.createElement('div');
  votes.classList.add('votes-container');

  const dislike = document.createElement('div');
  dislike.classList.add('dislike');

  const like = document.createElement('div');
  like.classList.add('like');

  dislikeIcon = createLikes();
  dislikeIcon.classList.add('dislikeIcon');

  likeIcon = createLikes();
  likeIcon.classList.add('likeIcon');
  likeIcon.style.transform = 'rotate(180deg)';

  if (json.posts[i].like) {
    likeIcon.style.stroke = '#1ED689';
  }

  if (json.posts[i].dislike) {
    dislikeIcon.style.stroke = '#FF3939';
  }

  const dislikeCount = document.createElement('p');
  dislikeCount.classList.add('asd');
  dislikeCount.textContent = json.posts[i].dislikes;

  const likeCount = document.createElement('p');
  likeCount.classList.add('dsa');
  likeCount.textContent = json.posts[i].likes;

  if (authenticated) {
    likeEventListener(likeIcon, dislikeIcon, json.posts[i], likeCount, dislikeCount);
  }

  dislike.appendChild(dislikeIcon);
  dislike.appendChild(dislikeCount);

  like.appendChild(likeIcon);
  like.appendChild(likeCount);

  votes.appendChild(dislike);
  votes.appendChild(like);
  const commentsContainer = createComments(json.posts[i]);

  textContainer.appendChild(text);
  usrTime.appendChild(username);
  usrTime.appendChild(timestamp);
  profileContainer.appendChild(userImg);
  postHeader.appendChild(profileContainer);
  postHeader.appendChild(usrTime);

  if (isAdmin()) {
    postHeader.appendChild(moreBtn);
  }

  postHeader.appendChild(morePopup);
  postCard.appendChild(postHeader);
  postCard.appendChild(textContainer);

  if (json.posts[i].hasOwnProperty('images')) {
    const images = json.posts[i].images;
    multipleImgPost(json, images, i, postCard);
  } else if (json.posts[i].hasOwnProperty('fileName')) {
    if (json.posts[i].hasOwnProperty('songId')) {
      audioPost(json, i, postCard);
    } else {
      videoPost(json, i, postCard);
    }
  }

  postCard.appendChild(votes);

  postCard.appendChild(commentsContainer);
  singlePostContainer.appendChild(postCard);
  feed.appendChild(singlePostContainer);
  feedContainer.appendChild(feed);
};

const createComments = (json) => {
  const tree = createTree(json.comments).reverse();

  const commentsContainer = document.createElement('div');
  commentsContainer.classList.add('comments-container');

  const hr = document.createElement('hr');
  hr.classList.add('comments-divider');

  commentsContainer.appendChild(hr);

  if (authenticated) {
    const commentForm = document.createElement('form');
    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.innerText = 'Submit';
    submit.classList.add('button', 'blue', 'white');
    const input = document.createElement('textarea');
    input.placeholder = 'Write something...';

    input.addEventListener('input', () => {
      if (input.value.length > 0) {
        submit.disabled = false;
      }
    });
    submit.disabled = true;
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const settings = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entityId: json.entityId,
          commentText: input.value,
        }),
      };

      fetch('/post/comment', settings).then((response) => response.json()).then((comment) => {
        console.log(comment[1][0].commentId);
        const post = commentsContainer.parentElement;
        post.removeChild(commentsContainer);
        json.comments.push(comment[1][0]);
        post.appendChild(createComments(json));
      }).catch((err) => alert(err));
    });

    commentForm.appendChild(input);
    commentForm.appendChild(submit);
    commentsContainer.appendChild(commentForm);
  }
  tree.forEach((cmnt) => {
    commentsContainer.appendChild(createComment(json, cmnt));
  });
  return commentsContainer;
};

const createTree = (list) => {
  const map = {};
  let node;
  const roots = [];
  let i;
  for (i = 0; i < list.length; i++) {
    map[list[i].commentId] = i; // initialize the map
    list[i].children = []; // initialize the children
  }
  for (i = 0; i < list.length; i++) {
    node = list[i];
    if (node.parentCommentId) {
      // if you have dangling branches check that map[node.parentId] exists
      list[map[node.parentCommentId]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
};

const createComment = (json, cmnt, commentGroup = document.createElement('div'), depth = 0) => {
  commentGroup.classList.add('comment-group');

  const commentContainer = document.createElement('div');
  commentContainer.classList.add('comment-container');

  const profileHeader = document.createElement('div');
  profileHeader.classList.add('comment-header');

  const profileImg = document.createElement('img');
  if (cmnt.userImg) {
    profileImg.setAttribute('src', `/static/uploads/${cmnt.userImg}`);
  } else {
    profileImg.setAttribute('src', `/static/img/bbe.png`);
  }
  profileHeader.appendChild(profileImg);

  const userElm = document.createElement('p');
  userElm.innerHTML = cmnt.displayName;
  profileHeader.appendChild(userElm);

  const commentElm = document.createElement('div');
  const commentText = document.createElement('p');

  commentText.innerText = cmnt.comment;
  commentElm.classList.add('comment');
  commentElm.appendChild(commentText);

  deleteComment = document.createElement('div');
  deleteComment.classList.add('delete-comment');

  deleteComment.addEventListener('click', () => {
    fetch(`/post/comment/${cmnt.commentId}`, { method: 'delete' }).
      then((response) => response.json()).
      then((newComment) => {
        const redacted = newComment[1][0];
        json.comments.forEach((elm) => {
          if (elm.commentId === redacted.commentId) {
            elm.comment = redacted.comment;
          }
        });
        const post = commentGroup.parentElement.parentElement;
        post.removeChild(commentGroup.parentElement);
        post.appendChild(createComments(json));
      });
  });

  if (isAdmin()) commentElm.appendChild(deleteComment);

  const footer = document.createElement('div');
  footer.classList.add('comment-footer');

  if (authenticated) {
    const reply = document.createElement('button');
    reply.innerText = 'Reply';
    reply.classList.add('reply-btn');
    footer.appendChild(reply);
    reply.addEventListener('click', (e) => {
      e.preventDefault();
      if (!commentContainer.querySelector('form')) {
        const replyForm = document.createElement('form');
        const submitReply = document.createElement('button');
        submitReply.type = 'submit';
        submitReply.innerText = 'Submit';
        submitReply.classList.add('button', 'blue', 'white');
        const inputReply = document.createElement('textarea');
        inputReply.placeholder = 'Write something';

        inputReply.addEventListener('input', () => {
          if (inputReply.value.length > 0) {
            submitReply.disabled = false;
          }
        });
        submitReply.disabled = true;
        replyForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const settings = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              entityId: json.entityId,
              commentText: inputReply.value,
              parentCommentId: cmnt.commentId,
            }),
          };

          fetch('/post/comment', settings).then((response) => response.json()).then((comment) => {
            const post = commentGroup.parentElement.parentElement;
            post.removeChild(commentGroup.parentElement);
            json.comments.push(comment[1][0]);
            post.appendChild(createComments(json));
          }).catch((err) => alert(err));
        });

        replyForm.appendChild(inputReply);
        replyForm.appendChild(submitReply);
        commentContainer.appendChild(replyForm);
      }
    });
  }

  const timestamp = document.createElement('p');
  timestamp.classList.add('timestamp');

  const commentTime = cmnt.timestamp;

  const m = moment.utc(commentTime, 'YYYY/MM/DD HH:mm:ss');
  timestamp.textContent = m.local().fromNow(commentTime);

  commentElm.appendChild(timestamp);

  commentContainer.appendChild(profileHeader);
  commentContainer.appendChild(commentElm);
  commentContainer.appendChild(footer);

  commentContainer.style.marginLeft = depth * 20 + 'px';

  commentGroup.appendChild(commentContainer);

  if (cmnt.children.length > 0) {
    depth++;
    const reversed = cmnt.children.reverse();
    reversed.forEach((child) => {
      createComment(json, child, commentGroup, depth);
    });
  }
  return commentGroup;
};

const audioPost = (json, i, postCard) => {
  const audioContainer = document.createElement('div');
  audioContainer.classList.add('media-container');

  const waveformContainer = document.createElement('div');
  waveformContainer.id = 'waveform';

  const controls = document.createElement('div');
  controls.classList.add('audiopost-controls');

  const toggle = document.createElement('button');

  const volumeContainer = document.createElement('div');
  volumeContainer.classList.add('volume-container');

  const volume = document.createElement('input');
  volume.classList.add('volume');
  volume.setAttribute('type', 'range');
  volume.setAttribute('min', '0');
  volume.setAttribute('max', '1');
  volume.setAttribute('value', '1');
  volume.setAttribute('step', '.1');

  toggle.classList.add('button', 'btn-toggle', 'blue');

  controls.appendChild(toggle);
  volumeContainer.appendChild(volume);
  controls.appendChild(volumeContainer);
  audioContainer.appendChild(waveformContainer);
  postCard.appendChild(audioContainer);
  postCard.appendChild(controls);

  createAudiowave(json, i, waveformContainer, toggle, volume);
};

const multipleImgPost = (json, images, i, postCard) => {
  const imageContainer = document.createElement('div');
  imageContainer.classList.add('media-container');

  for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.setAttribute('src', `/static/uploads/${images[i].fileName}`);
    imageContainer.appendChild(img);
  }

  postCard.appendChild(imageContainer);
};

const videoPost = (json, i, postCard) => {
  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('media-container');

  const video = document.createElement('video');
  video.setAttribute('src', `/static/uploads/${json.posts[i].fileName}`);
  video.setAttribute('controls', 'controls');
  mediaContainer.appendChild(video);

  postCard.appendChild(mediaContainer);
};

const likeEventListener = (likeElement, dislikeElement, post, likeCount, dislikeCount) => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      entityId: post.entityId,
    }),
  };

  likeElement.addEventListener('click', () => {
    if (post.like) return;

    likeElement.style.stroke = '#1ED689';
    fetch('/post/like', settings).then((response) => response.json()).then((json) => {
      if (json.success) {
        if (post.dislike) {
          post.likes += 1;
          post.dislikes -= 1;
          dislikeElement.style.stroke = '#6C6E86';
        } else {
          post.likes += 1;
          likeCount.textContent = post.likes + 1;
        }

        dislikeCount.textContent = post.dislikes;
        likeCount.textContent = post.likes;

        post.like = true;
        post.dislike = false;
      }
    }).catch((err) => {
      console.log('nopedi nope go get the rope ' + err);
    });
  });

  dislikeElement.addEventListener('click', () => {
    if (post.dislike) return;

    dislikeElement.style.stroke = '#FF3939';
    fetch('/post/dislike', settings).then((response) => response.json()).then((json) => {
      if (json.success) {
        if (post.like) {
          post.likes -= 1;
          post.dislikes += 1;
          likeElement.style.stroke = '#6C6E86';
        } else {
          post.dislikes += 1;
          dislikeCount.textContent = post.dislikes + 1;
        }
        dislikeCount.textContent = post.dislikes;
        likeCount.textContent = post.likes;

        post.like = false;
        post.dislike = true;
      }
    }).catch((err) => {
      console.log('nopedi nope go get the rope ' + err);
    });
  });
};

const getTrendingFeed = () => {
  loading.classList.add('loading');
  fetch('/trending').then((response) => response.json()).then((json) => {
    if (!json.success) {
      console.log(json);
      alert(json.error);
      return;
    }

    for (let i = 0; i < json.posts.length; i++) {
      createPost(json, i);
    }

    loading.classList.remove('loading');
  }).catch((err) => {
    console.error(err);
  });
};

const getUserFeed = () => {
  loading.classList.add('loading');
  const path = window.location.pathname.split('/')[2];
  fetch(`/user/posts/${path}`).then((response) => response.json()).then((json) => {
    if (!json.success) {
      alert(json.error);
      return;
    }
    for (let i = 0; i < json.posts.length; i++) {
      createPost(json, i);
    }
    loading.classList.remove('loading');
  }).catch((err) => {
    console.error(err);
  });
};

const getLocation = () => {
  fetch('/authenticated', { method: 'GET' }).then((response) => response.text()).then((res) => {
    authenticated = res === 'true';
    if (/user/.test(self.location.href)) {
      feed.id = 'profile-feed';
      getUserFeed();
    } else {
      feed.id = 'trending-feed';
      getTrendingFeed();
    }
  });
};

getLocation();
