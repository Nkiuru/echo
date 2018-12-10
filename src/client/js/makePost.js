const openPostBtn = document.querySelector('#add-post-open');
const postFormContainer = document.querySelector('.post-container');
const postForm = document.querySelector('#post-form');
const submitBtn = document.querySelector('#submit-post');
const overlay = document.querySelector('#overlay');
const closeBtn = document.querySelector('.close');
const fullscreen = document.querySelector('.fullscreen');

const imgFiletype = document.querySelector('#filetype-img');
const videoFiletype = document.querySelector('#filetype-video');
const audioFiletype = document.querySelector('#filetype-audio');

const progressContainer = document.querySelector('.progress');
const fileInput = document.querySelector('#file-input');

const postError = document.createElement('div');
postError.classList.add('post-error');
const errorMsg = document.createElement('p');

let isAudio = false;
let isGenreSelected = false;
let hasTitle = false;

const img = 'image/*,.pdf';
const video = '.mp4,.webm';
const audio = 'audio/*';

let inputType = 'all';
let hasFiles = false;

let files = [];

fileInput.addEventListener('change', () => {
  console.log(fileInput.value);
  files = fileInput.files;
  console.log(files.length);

  for (let i = 0; i < files.length; i++) {
    const selectedFile = document.createElement('p');

    const oneFileProgress = document.createElement('div');
    oneFileProgress.classList.add('one-file-progress');

    selectedFile.textContent = files[i].name;
    oneFileProgress.appendChild(selectedFile);
    progressContainer.appendChild(oneFileProgress);

    if (files[i].size > 100000000) {
      console.log(files[i].size);
      selectedFile.textContent = 'File size is too big';
    };
  }
  hasFiles = true;
});

// change accepted filetype according to checked radio button
const fileSelection = () => {
  imgFiletype.addEventListener('change', (e) => {
    fileInput.accept = img;
    inputType = fileInput.accept;
    removeAudioFields();
  });

  videoFiletype.addEventListener('change', (e) => {
    fileInput.accept = video;
    inputType = fileInput.accept;
    removeAudioFields();
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

      songName.addEventListener('change', () => {
        if (songName.value.length > 0) {
          console.log('has title');
          hasTitle = true;
        }
      });

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

  select.addEventListener('change', () => {
    isGenreSelected = true;
  });

  genres.forEach((genre) => {
    const option = document.createElement('option');
    option.setAttribute('value', genre.genreId);
    option.innerText = genre.genreName;
    select.appendChild(option);
  });
  return select;
};

const removeAudioFields = () => {
  const container = document.querySelector('.progress');
  const select = container.querySelector('select');
  isAudio = false;
  if (select) {
    container.removeChild(select);
  }
  const songName = container.querySelector('input');
  if (songName) {
    container.removeChild(songName);
  }
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
      window.location.replace(window.location.pathname);
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
      window.location.replace(window.location.pathname);
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
      window.location.replace(window.location.pathname);
    }).catch((err) => {
      console.log(`error: ${err}`);
    });
  };

  const audioPost = () => {
    fetch('/post/audio', mediaSettings).then((results) => results.json()).then((json) => {
      if (!json[0].success) {
        alert(json.error);
        return;
      }
      console.log(json);
      window.location.replace(window.location.pathname);
    }).catch((err) => {
      console.log(`err ${err}`);
    });
  };

  if (inputType == 'all' && !hasFiles) {
    textPost();
  } else if (inputType == 'all' && hasFiles) {
    errorMsg.textContent = 'Please select a filetype';

    postError.appendChild(errorMsg);
    postFormContainer.appendChild(postError);
    return;
  } else if (inputType == img) {
    imgPost();
  } else if (inputType == video) {
    videoPost();
  } else if (inputType == audio) {
    console.log('title ' + hasTitle);
    console.log('genre ' + isGenreSelected);
    if (!hasTitle || !isGenreSelected) {
      errorMsg.textContent = 'Please give a title & genre';
      postError.appendChild(errorMsg);
      postFormContainer.appendChild(postError);
      return;
    } else {
      audioPost();
    }
  };
  closeOverlay();
});
