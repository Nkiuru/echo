const openPostBtn = document.querySelector('#add-post-open');
const createPostForm = document.querySelector('.post-container');
const submitBtn = document.querySelector('#submit-post');
// const postForm = document.querySelector('form[name=post-form]');
const overlay = document.querySelector('#overlay');


openPostBtn.addEventListener('click', (e) => {
  e.preventDefault();
  createPostForm.style.display = 'flex';
  overlay.style.display = 'block';
  console.log('opened');
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
