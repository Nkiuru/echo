const openPostBtn = document.querySelector('#add-post-open');
const postFormContainer = document.querySelector('.post-container');
const postForm = document.querySelector('#post-form');
const submitBtn = document.querySelector('#submit-post');
const overlay = document.querySelector('#overlay');
const closeBtn = document.querySelector('.close');
const fullscreen = document.querySelector('.fullscreen');
const postText = document.querySelector('#single-post-container');

const imgFiletype = document.querySelector('#filetype-img');
const videoFiletype = document.querySelector('#filetype-video');
const audioFiletype = document.querySelector('#filetype-audio');

const fileInput = document.querySelector('#file-input');

let isAudio = false;

// song title, genreId, bandId, text (post)

const img = 'image/*,.pdf';
const video = '.mp4,.webm';
const audio = 'audio/*';

let body = '';
let inputType = 'all';

// change accepted filetype according to checked radio button
const fileSelection = () => {
  imgFiletype.addEventListener('change', (e) => {
    fileInput.accept = img;
    inputType = fileInput.accept;
  });

  videoFiletype.addEventListener('change', (e) => {
    fileInput.accept = video;
    inputType = fileInput.accept;
  });

  audioFiletype.addEventListener('change', (e) => {
    fileInput.accept = audio;
    inputType = fileInput.accept;
    if (!isAudio) {
      addFieldsForAudio();
    } else {
      isAudio = true;
    }
  });
};

const addFieldsForAudio = () => {
  const settings = {
    method: 'GET',
  };

  fetch('/genres', settings).then((response) => response.json()).then((json) => {
    if (json[0].success) {
      const select = createGenreSelect(json[1]);
      const songName = document.createElement('input');
      songName.setAttribute('type', 'text');
      songName.setAttribute('form', 'post-form');
      songName.setAttribute('name', 'songTitle');
      songName.setAttribute('placeholder', 'Song title');
      songName.required = true;
      const container = document.querySelector('.progress');
      container.appendChild(songName);
      container.appendChild(select);
      isAudio = true;
    } else {
      throw new Error('something went wrong');
    }
  }).catch((err) => alert(err));
};

const createGenreSelect = (genres) => {
  const select = document.createElement('select');
  select.setAttribute('name', 'genreId');
  select.required = true;
  const opt = document.createElement('option');
  opt.classList.add('placeholder');
  opt.setAttribute('value', '');
  opt.selected = true;
  opt.disabled = true;
  opt.hidden = true;
  opt.innerText = 'Genre';
  select.appendChild(opt);

  genres.forEach((genre) => {
    const option = document.createElement('option');
    option.setAttribute('value', genre.genreId);
    option.innerText = genre.genreName;
    select.appendChild(option);
  });
  return select;
};

fileSelection();

const closeOverlay = () => {
  postFormContainer.classList.add('closing');
  overlay.classList.add('closing');

  setTimeout(() => {
    postFormContainer.classList.remove('closing');
    overlay.classList.remove('closing');
    fullscreen.style.display = 'none';
    overlay.style.display = 'none';
  }, 500);
};

openPostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fullscreen.style.display = 'flex';
  overlay.style.display = 'block';
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  closeOverlay();
});

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  closeOverlay();

  const fd = new FormData(postForm);

  const mediaSettings = {
    method: 'POST',
    body: fd,
  };

  const textSettings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postText: document.querySelector('#postText').value,
    }),
  };

  const textPost = () => {
    fetch('/post', textSettings).then((response) => response.json()).then((json) => {
      if (!json.success) {
        alert(json.error);
        return;
      }

      const markup = `
          <div id="post-card">
            <div class="post-header">
              <div class="usr-time">
                <p>${json.timestamp}</p>
              </div>
          </div>
            <div class="profile-container">
              <p>${json.text}</p>
            </div>
          </div>
        `;
      body += markup;
      console.log(body);
      postText.innerHTML = body;
    }).catch((err) => {
      console.log(`error ${err}`);
    });
  };

  const imgPost = () => {
    fetch('/post/image', mediaSettings).then((response) => response.json()).then((json) => {
      if (!json[0].success) {
        alert(json.error);
        return;
      }
      console.log(json);
      const imgUrl = json[1].images[0].fileName;
      const timestamp = json[1].timestamp;
      // const imgTitle = json[1].images[0].title;
      const text = json[1].text;
      const markup = `
          <div id="post-card">
            <div class="post-header">
              <div class="profile-container">
                <img src="/static/img/bbe.png" alt="">
              </div>
              <div class="usr-time">
                <h4>username</h4>
                <p>${timestamp}</p>
              </div>
          </div>
            <div class="text-container">
              <p>${text}</p>
            </div>
            <div class="media-container">
              <img src="/static/uploads/${imgUrl}">
            </div>
          </div>
        `;
      body += markup;
      postText.innerHTML = body;
    }).catch((err) => {
      console.log(`error ${err}`);
    });
  };

  const videoPost = () => {
    fetch('/post/video', mediaSettings).then((response) => response.json()).then((json) => {
      if (!json[0].success) {
        alert(json.error);
        return;
      }
      const timestamp = json[1].timestamp;
      const text = json[1].text;
      const videoUrl = json[1].fileName;
      const markup = `
          <div id="post-card">
            <div class="post-header">
              <div class="usr-time">
                <p>${timestamp}</p>
              </div>
          </div>
            <div class="text-container">
              <p>${text}</p>
            </div>
            <div class="media-container">
              <video controls>
                <source src="/static/uploads/${videoUrl}" type="video/mp4">
              </video>
            </div>
          </div>`;
      body += markup;
      postText.innerHTML = body;
      console.log(json);
    }).catch((err) => {
      console.log(`error: ${err}`);
    });
  };

  const audioPost = () => {
    fetch('/post/audio', mediaSettings).then((results) => results.json()).then((json) => {

      console.log(mediaSettings);
      if (!json[0].success) {
        alert(json.error);
        return;
      }
      console.log('audio post bbyyy');
      console.log(json);

      const timestamp = json[1].timestamp;
      const text = json[1].text;

      const cont = document.createElement('div');
      cont.id = 'waveform';

      const wavesurfer = WaveSurfer.create({
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
      });

      const audioFile = wavesurfer.load(`/static/uploads/${json[1].fileName}`);

      const markup = `
        <div id="post-card">
          <div class="post-header">
            <div class="usr-time">
              <p>${timestamp}</p>
            </div>
        </div>
          <div class="text-container">
            <p>${text}</p>
          </div>
          <div class="media-container">
            <p>${json[1].title}</p>
            ${cont.appendChild(audioFile)}
          </div>
        </div>`;

      body += markup;
      postText.innerHTML = body;

    }).catch((err) => {
      console.log(`err ${err}`);
    });
  };

  if (inputType == 'all') {
    textPost();
  } else if (inputType == img) {
    imgPost();
  } else if (inputType == video) {
    videoPost();
  } else if (inputType == audio) {
    console.log('audio post');
    audioPost();
  }
});
