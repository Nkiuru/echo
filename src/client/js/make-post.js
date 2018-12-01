const openPostBtn = document.querySelector('#add-post-open');
const postForm = document.querySelector('.post-container');
const submitBtn = document.querySelector('#submit-post');
const overlay = document.querySelector('#overlay');
const closeBtn = document.querySelector('.close');
const fullscreen = document.querySelector('.fullscreen');
const postText = document.querySelector('#single-post-container');

const imgFiletype = document.querySelector('#filetype-img');
const videoFiletype = document.querySelector('#filetype-video');
const audioFiletype = document.querySelector('#filetype-audio');

let body = '';

// TODO: change accepted filetype according to checked radio button
const fileSelection = () => {
  imgFiletype.addEventListener('change', (e) => {
    console.log('image radio button selected');
  });

  videoFiletype.addEventListener('change', (e) => {
    console.log('video radio button selected');
  });

  audioFiletype.addEventListener('change', (e) => {
    console.log('audio radio button selected');
  });
};

fileSelection();

const closeOverlay = () => {
  postForm.classList.add('closing');
  overlay.classList.add('closing');

  setTimeout(() => {
    postForm.classList.remove('closing');
    overlay.classList.remove('closing');
    fullscreen.style.display = 'none';
    overlay.style.display = 'none';
  }, 500);
};

openPostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fullscreen.style.display = 'flex';
  overlay.style.display = 'block';
  console.log('opened');
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  closeOverlay();
});

submitBtn.addEventListener('click', (e) => {
  console.log('post');
  e.preventDefault();

  closeOverlay();

  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      postText: document.querySelector('#text').value,
    }),
  };

  fetch('/post', settings)
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
      console.log('POST CREATED');
      console.log(body);
      postText.innerHTML = body;
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
});