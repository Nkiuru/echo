const trendingFeed = document.querySelector('#trending-feed');
let body = '';

const singleImgPost = (json, images, i) => {
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

  const img = document.createElement('img');
  img.setAttribute('src', `/static/uploads/${images[0].fileName}`);

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('media-container');

  const text = document.createElement('p');
  text.textContent = json.posts[i].text;

  textContainer.appendChild(text);
  imageContainer.appendChild(img);
  usrTime.appendChild(username);
  usrTime.appendChild(timestamp);
  profileContainer.appendChild(userImg);
  postHeader.appendChild(profileContainer);
  postHeader.appendChild(usrTime);
  postCard.appendChild(postHeader);
  postCard.appendChild(textContainer);
  postCard.appendChild(imageContainer);
  singlePostContainer.appendChild(postCard);
  trendingFeed.appendChild(singlePostContainer);
};

const multipleImgPost = (json, images, i) => {
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

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('media-container');

  for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.setAttribute('src', `/static/uploads/${images[i].fileName}`);
    imageContainer.appendChild(img);
  }

  textContainer.appendChild(text);
  usrTime.appendChild(username);
  usrTime.appendChild(timestamp);
  profileContainer.appendChild(userImg);
  postHeader.appendChild(profileContainer);
  postHeader.appendChild(usrTime);
  postCard.appendChild(postHeader);
  postCard.appendChild(textContainer);
  postCard.appendChild(imageContainer);
  singlePostContainer.appendChild(postCard);
  trendingFeed.appendChild(singlePostContainer);
};

const videoPost = (json, i) => {
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

  const mediaContainer = document.createElement('div');
  mediaContainer.classList.add('media-container');

  const video = document.createElement('video');
  video.setAttribute('src', `/static/uploads/${json.posts[i].fileName}`);
  video.setAttribute('controls', 'controls');
  mediaContainer.appendChild(video);

  textContainer.appendChild(text);
  usrTime.appendChild(username);
  usrTime.appendChild(timestamp);
  profileContainer.appendChild(userImg);
  postHeader.appendChild(profileContainer);
  postHeader.appendChild(usrTime);
  postCard.appendChild(postHeader);
  postCard.appendChild(textContainer);
  postCard.appendChild(mediaContainer);
  singlePostContainer.appendChild(postCard);
  trendingFeed.appendChild(singlePostContainer);
};

const textPost = (json, i) => {
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
  singlePostContainer.appendChild(postCard);
  trendingFeed.appendChild(singlePostContainer);
};

const getFeed = () => {
  const loading = document.querySelector('#loading');
  loading.classList.add('loading');
  fetch('/trending')
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        alert(json.error);
        return;
      }

      for (let i = 0; i < json.posts.length; i++) {
        // console.log(json);
        if (json.posts[i].hasOwnProperty('images')) {
          const images = json.posts[i].images;
          if (images.length > 1) {
            for (let i = 0; i < images.length; i++) {
              // multiple images
              multipleImgPost(json, images, i);
            }
          } else {
            // one image
            singleImgPost(json, images, i);
          }
        } else if (json.posts[i].hasOwnProperty('fileName')) {
          // video post
          videoPost(json, i);
        } else {
          // text post
          textPost(json, i);
        }
      };
      loading.classList.remove('loading');
    })
    .catch((err) => {
      alert(`SOS ${err} SOS`);
    });
};

getFeed();
