const logoutLink = document.querySelector('#dd-logout');
const profileLink = document.querySelector('#dd-profile');
const settingsLink = document.querySelector('#dd-settings');
const dropdownToggle = document.querySelector('#dropdown-toggle');
const dropdown = document.querySelector('.dropdown');
const rightContainer = document.querySelector('.right-side-items');

dropdownToggle.addEventListener('click', (e) => {
  if (!dropdown.classList.contains('show')) {
    dropdown.classList.add('show');
  } else {
    dropdown.classList.remove('show');
  }
});

const getUser = () => {
  fetch('/users/user').then((result) => result.json()).then((json) => {
    if (json.success === false) {
      dropdownToggle.style = 'display: none';
      const btn = document.createElement('button');
      btn.innerText = 'Login';
      btn.classList.add('button');
      btn.classList.add('blue');
      btn.classList.add('white');
      btn.style = 'margin-right: 1rem';
      btn.addEventListener('click', () => window.location.replace('/login'));
      rightContainer.appendChild(btn);
    } else {
      dropdownToggle.style = 'display: flex';
    }
  }).catch((err) => {
    alert(err);
  });
};

const profile = (e) => {
  fetch('/users/user').then((result) => result.json()).then((json) => {
    console.log(json);
    window.location.replace(`/user/${json.username}`);
  }).catch(() => {
    alert('Something went fucksie wucksie');
  });
};

const settings = (e) => {
  fetch('/users/user').then((result) => result.json()).then((json) => {
    console.log(json);
    window.location.replace(`/user/settings`);
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
getUser();
logoutLink.addEventListener('click', logout);
