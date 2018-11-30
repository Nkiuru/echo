'use strict';

const logoutBtn = document.querySelector('#logout-btn');

const logout = (e) => {
  const settings = {
    'method': 'POST',
  };
  fetch('/logout', settings).then((result) => {
    return result.json();
  }).then((json) => {
    if (json.success) {
      window.location.replace('/');
    }
  }).catch(() => {
    alert('Something went fucksie wucksie');
  });
};

logoutBtn.addEventListener('click', logout);
