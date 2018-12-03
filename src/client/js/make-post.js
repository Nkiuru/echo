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


const img = 'image/*,.pdf';
const video = '.mp4,.webm';
const audio = 'audio/*';

let body = '';
let inputType = 'all';

// TODO: change accepted filetype according to checked radio button
const fileSelection = () => {
  imgFiletype.addEventListener('change', (e) => {
    console.log('image radio button selected');
    fileInput.accept = img;
    inputType = fileInput.accept;
  });

  videoFiletype.addEventListener('change', (e) => {
    console.log('video radio button selected');
    fileInput.accept = video;
    inputType = fileInput.accept;
  });

  audioFiletype.addEventListener('change', (e) => {
    console.log('audio radio button selected');
    fileInput.accept = audio;
    inputType = fileInput.accept;
  });
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

  closeOverlay();

  for (const [key, value] of fd.entries()) {
    console.log(key, value);
  }


  const textSettings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postText: document.querySelector('#postText').value,
    }),
  };

  const imgSettings = {
    method: 'POST',
    body: fd,
  };

  if (inputType == 'all') {
    console.log('text');
    fetch('/post', textSettings)
      .then((response) => response.json())
      .then((json) => {
        if (!json.success) {
          alert(json.error);
          return;
        }
        console.log(json);
        const markup = `
          <div class="post-card">
            <div class="text-container">
              <p>${json.timestamp}</p>
              <p>${json.text}</p>
            </div>
          </div>
        `;
        body += markup;
        console.log(body);
        postText.innerHTML = body;
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  } else if (inputType == img) {
    console.log(fd.entries());
    fetch('/post/image', imgSettings)
      .then((response) => response.json())
      .then((json) => {
        if (!json[0].success) {
          alert(json.error);
          return;
        }
        console.log(json);
      })
      .catch((err) => {
        console.log(`error ${err}`);
      });
  } else if (inputType == video) {
    console.log('video');
  } else {
    console.log('audio');
  }
});
