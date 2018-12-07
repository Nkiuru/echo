// const feed = document.querySelector('#trending-feed');
const feedContainer = document.querySelector('.feed-container');
const feed = document.createElement('div');
const loading = document.querySelector('#loading');

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

const getTrendingFeed = () => {
  loading.classList.add('loading');
  fetch('/trending')
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
    })
    .catch((err) => {
      console.error(err);
    });
};

const getUserFeed = () => {
  loading.classList.add('loading');
  const path = window.location.pathname.split('/')[2];
  console.log(path);
  fetch(`/user/posts/${path}`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (!json.success) {
        alert(json.error);
        return;
      }
      for (let i = 0; i < json.posts.length; i++) {
        createPost(json, i);
      };
      loading.classList.remove('loading');
    })
    .catch((err) => {
      console.error(err);
    });
};

const getLocation = () => {
  if (/user/.test(self.location.href)) {
    feed.id = 'profile-feed';
    console.log('user');
    getUserFeed();
  } else {
    feed.id = 'trending-feed';
    getTrendingFeed();
  }
};
getLocation();

