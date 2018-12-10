const logoutLink = document.querySelector('#dd-logout');
const profileLink = document.querySelector('#dd-profile');
const settingsLink = document.querySelector('#dd-settings');
const dropdownToggle = document.querySelector('#dropdown-toggle');
const dropdown = document.querySelector('.dropdown');
const rightContainer = document.querySelector('.right-side-items');
let authenticated = false;

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
      btn.style.marginRight = '1rem';
      btn.addEventListener('click', () => window.location.replace('/login'));
      rightContainer.appendChild(btn);
    } else {
      window.localStorage.setItem('userData', JSON.stringify(json));
      dropdownToggle.style = 'display: flex';
      setProfilePicture();
    }
  }).catch((err) => {
    alert(err);
  });

};

const setProfilePicture = () => {
  const userData = JSON.parse(window.localStorage.getItem('userData'));
  const img = document.querySelector('#profile-picture');
  if (userData.usrImg) {
    img.setAttribute('src', `/static/uploads/${userData.usrImg}`);
  }
};

const profile = (e) => {
  if (window.localStorage.getItem('userData')) {
    const userData = JSON.parse(window.localStorage.getItem('userData'));
    window.location.replace(`/user/${userData.username}`);
  } else {
    fetch('/users/user').then((result) => result.json()).then((json) => {
      console.log(json);
      window.location.replace(`/user/${json.username}`);
    }).catch(() => {
      alert('Something went fucksie wucksie');
    });
  }
};

const settings = (e) => {
  window.location.replace('/user/settings');
};

const logout = (e) => {
  const settings = {
    'method': 'POST',
  };
  fetch('/logout', settings).then((result) => {
    return result.json();
  }).then((json) => {
    if (json.success) {
      window.localStorage.clear();
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

const checkAuth = () => {
  fetch('/authenticated', { method: 'GET' }).then((response) => response.text()).then((res) => {
    authenticated = res === 'true';
    if (authenticated && window.localStorage.getItem('userData')) {
      setProfilePicture();
    } else {
      getUser();
    }
  });
};

checkAuth();
logoutLink.addEventListener('click', logout);
