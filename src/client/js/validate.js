console.log('hello');

const submit = document.getElementById('submit');
const error = document.getElementById('form-error');

const username = document.forms['login-form'].username;
const password = document.forms['login-form'].password;

const isValid = () => {
};

submit.addEventListener('click', (e) => {
  if (isValid()) {
    console.log('form valid');
  } else {
    error.style.display = 'block';
  }
});
