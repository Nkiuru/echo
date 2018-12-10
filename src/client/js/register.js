const submit = document.getElementById('register-submit');
const email = document.getElementById('email');
const password = document.getElementById('psw');
const passwordRepeat = document.getElementById('psw-repeat');
const error = document.querySelector('#form-error');
const validateEmail = (email) => {
  const expression = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return expression.test(email);
};

const validatePassword = () => {
  let valid = true;
  if (password.value !== passwordRepeat.value) {
    passwordRepeat.setCustomValidity('Passwords Don\'t Match');
    password.classList.add('invalid');
    passwordRepeat.classList.add('invalid');
    valid = false;
  } else if (password.value.length < 8) {
    password.setCustomValidity('too short');
    valid = false;
  } else {
    passwordRepeat.setCustomValidity('');
    valid = true;
  }
  return valid;
};

const isValid = () => {
  let valid = true;
  if (validateEmail(email.value) === false) {
    valid = false;
    email.classList.add('invalid');
  } else {
    email.classList.remove('invalid');
  }
  if (validatePassword() === false) {
    valid = false;
    password.classList.add('invalid');
  } else {
    password.classList.remove('invalid');
  }
  return valid;
};

submit.addEventListener('click', (e) => {
  if (isValid()) {
    console.log('form is valid');
    e.preventDefault();
    const fd = document.querySelector('#registerForm');
    const username = fd.elements.namedItem('username').value;
    const password = fd.elements.namedItem('psw').value;
    const passwordRepeat = fd.elements.namedItem('psw-repeat').value;
    const displayName = fd.elements.namedItem('displayName').value;
    const countryId = fd.elements.namedItem('country').value;
    const email = fd.elements.namedItem('email').value;
    const city = fd.elements.namedItem('city').value;

    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'username': username,
        'password': password,
        'password2': passwordRepeat,
        'displayName': displayName,
        'countryId': countryId,
        'city': city,
        'email': email,
      }),
    };

    console.log(settings);
    fetch('/register', settings)
      .then(response => response.json())
      .then((json) => {
        if (!json.success) {
          alert(json.error);
          if (json.error === 'ER_DUP_ENTRY') {
            error.innerHTML = 'Duplicate Username or Email';
          } else {
            error.innerHTML = json.error;
          }
          error.style.display = 'block';
          return;
        }
        if (window.confirm('Redirect to login')) {
          window.location.replace('/login');
        }
      }).
      catch((err) => {
        console.log('ERROR ' + err);
      });
  } else {
    console.log('invalid form');
    e.preventDefault();
  }
});


