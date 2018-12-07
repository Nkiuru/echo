// const feed = document.querySelector('#trending-feed');
const feedContainer = document.querySelector('.feed-container');
const feed = document.createElement('div');
const loading = document.querySelector('#loading');

const likeElements = [];

let dislikeIcon = '';
let likeIcon = '';
let likeIconCircle = '';

const createLikes = () => {
  const likeIconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  likeIconSvg.setAttribute('width', '24px');
  likeIconSvg.setAttribute('height', '24px');
  likeIconSvg.setAttribute('viewBox', '0 0 24 24');
  likeIconSvg.setAttribute('fill', 'none');
  likeIconSvg.setAttribute('stroke-width', '2');
  likeIconSvg.style.stroke = '#6C6E86';

  likeIconCircle = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  likeIconCircle.setAttribute('d', `M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z`);

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
  singlePostContainer.id = 'single-post-container';

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
  timestamp.textContent = json.posts[i].timestamp;

  const textContainer = document.createElement('div');
  textContainer.classList.add('text-container');

  const text = document.createElement('p');
  text.textContent = json.posts[i].text;

  const hr = document.createElement('hr');

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

  const dislikeCount = document.createElement('p');
  dislikeCount.classList.add('asd');
  dislikeCount.textContent = json.posts[i].dislikes;

  const likeCount = document.createElement('p');
  likeCount.classList.add('dsa');
  likeCount.textContent = json.posts[i].likes;

  likeEventListener(likeIcon, dislikeIcon, json.posts[i], likeCount, dislikeCount);

  dislike.appendChild(dislikeIcon);
  dislike.appendChild(dislikeCount);

  like.appendChild(likeIcon);
  like.appendChild(likeCount);

  votes.appendChild(dislike);
  votes.appendChild(like);

  textContainer.appendChild(text);
  usrTime.appendChild(username);
  usrTime.appendChild(timestamp);
  profileContainer.appendChild(userImg);
  postHeader.appendChild(profileContainer);
  postHeader.appendChild(usrTime);
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
  postCard.appendChild(hr);
  postCard.appendChild(votes);
  singlePostContainer.appendChild(postCard);
  feed.appendChild(singlePostContainer);
  feedContainer.appendChild(feed);
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

  const hr = document.createElement('hr');

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
  postCard.appendChild(hr);
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
    likeElement.style.stroke = '#1ED689';
    fetch('/post/like', settings)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          likeCount.textContent = post.likes + 1;
        }
      })
      .catch((err) => {
        console.log('nopedi nope go get the rope ' + err);
      });
  });

  dislikeElement.addEventListener('click', () => {
    dislikeElement.style.stroke = '#FF3939';
    fetch('/post/dislike', settings)
      .then((response) => response.json())
      .then((json) => {
        if (json.success) {
          console.log(dislikeCount.textContent);
          const count = post.dislikes + 1;
          dislikeCount.textContent = '-' + count;
        }
      })
      .catch((err) => {
        console.log('nopedi nope go get the rope ' + err);
      });
  });
};

const getTrendingFeed = () => {
  loading.classList.add('loading');
  fetch('/trending')
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        alert(json.error);
        return;
      }
      console.log(`post likes: ${json.posts[0].text} ${json.posts[0].likes}`);
      for (let i = 0; i < json.posts.length; i++) {
        createPost(json, i);
      };
      loading.classList.remove('loading');
    })
    .catch((err) => {
      console.error(err);
    });
};

const getUserFeed = () => {
  loading.classList.add('loading');
  fetch('/userPosts')
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        alert(json.error);
        return;
      }
      for (let i = 0; i < json.posts.length; i++) {
        createPost(json, i);
      };

      loading.classList.remove('loading');
      console.log(likeElements.length);
    })
    .catch((err) => {
      console.error(err);
    });
};

const getLocation = () => {
  if (/user/.test(self.location.href)) {
    feed.id = 'profile-feed';
    getUserFeed();
  } else {
    feed.id = 'trending-feed';
    getTrendingFeed();
  }
};

getLocation();
