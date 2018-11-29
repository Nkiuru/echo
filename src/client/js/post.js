const openPostBtn = document.querySelector('#add-post-open');
const postForm = document.querySelector('.post-container');
const submitBtn = document.querySelector('#submit-post');
const overlay = document.querySelector('#overlay');
const closeBtn = document.querySelector('.close');
const fullscreen = document.querySelector('.fullscreen');


openPostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  fullscreen.style.display = 'flex';
  overlay.style.display = 'block';
  console.log('opened');
});

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  postForm.classList.add('closing');
  overlay.classList.add('closing');

  setTimeout(() => {
    postForm.classList.remove('closing');
    overlay.classList.remove('closing');
    fullscreen.style.display = 'none';
    overlay.style.display = 'none';
  }, 500);
});


submitBtn.addEventListener('click', (e) => {
  console.log('post');
  e.preventDefault();
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
    })
    .catch((err) => {
      console.log(err);
    });
});
