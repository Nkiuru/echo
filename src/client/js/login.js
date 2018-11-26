'use strict';

const loginForm = document.querySelector('form[name=login-form]');
const btn = document.querySelector('#submit');

btn.addEventListener('click', (e) => {
  e.preventDefault();
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
  fetch('login', settings).catch((err) => {
    console.log(err);
  });
});
