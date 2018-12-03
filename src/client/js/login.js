'use strict';

const loginForm = document.querySelector('form[name=login-form]');
const input = document.querySelector('.login-input');
const btn = document.querySelector('#submit');


input.addEventListener('keyup', (e) => {
  e.preventDefault();
  if (event.keyCode === 13) {
    fetchUser();
  }
});

const login = () => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    fetchUser();
  });
};

login();

const fetchUser = () => {
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: loginForm.elements.namedItem('username').value,
      password: loginForm.elements.namedItem('psw').value,
    }),
  };
  fetch('/login', settings)
    .then((response) => response.json())
    .then((json) => {
      if (!json.success) {
        alert(json.error);
        return;
      }
      window.location.replace('/user/' + username.value);
    })
    .catch((err) => {
      console.log(err);
    });
};
