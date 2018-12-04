const logoutLink = document.querySelector('#dd-logout');
const profileLink = document.querySelector('#dd-profile');
const settingsLink = document.querySelector('#dd-settings');
const dropdownToggle = document.querySelector('#dropdown-toggle');
const dropdown = document.querySelector('.dropdown');

dropdownToggle.addEventListener('click', (e) => {
  if (!dropdown.classList.contains('show')) {
    dropdown.classList.add('show');
  } else {
    dropdown.classList.remove('show');
  }
});

const profile = (e) => {
  fetch('/users/user')
    .then((result) => result.json())
    .then((json) => {
      console.log(json);
      window.location.replace(`/user/${json.username}`);
    }).catch(() => {
      alert('Something went fucksie wucksie');
    });
};

const settings = (e) => {
  fetch('/users/user')
    .then((result) => result.json())
    .then((json) => {
      console.log(json);
      window.location.replace(`/user/${json.username}`);
    }).catch(() => {
      alert('Something went fucksie wucksie');
    });
};

const logout = (e) => {
  const settings = {
    'method': 'POST',
  };
  fetch('/logout', settings).then((result) => {
    return result.json();
  }).then((json) => {
    if (json.success) {
      window.location.replace('/login');
    }
  }).catch((err) => {
    alert('Something went fucksie wucksie' + err);
  });
};

profileLink.addEventListener('click', (e) => {
  e.preventDefault();
  profile();
});

settingsLink.addEventListener('click', (e) => {
  e.preventDefault();
  settings();
});

logoutLink.addEventListener('click', logout);
