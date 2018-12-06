const displayName = document.querySelector('.display-name');
const locationElement = document.querySelector('.location');
const bio = document.querySelector('.bio-text');
const profileImg = document.querySelector('#usrImg');

const getUser = () => {
  if (window.localStorage.getItem('userData')) {
    updateProfile(JSON.parse(window.localStorage.getItem('userData')));
  } else {
    fetch('/users/user').then((response) => response.json()).then((json) => {
      updateProfile(json);
    }).catch((err) => console.log(err));
  }
};

const updateProfile = (json) => {
  // set display name
  displayName.textContent = json.displayName;

  // Check if both city and country are given and display location correctly
  if (json.city && json.country) {
    locationElement.textContent = `${json.city}, ${json.country}`;
  } else if (json.city && !json.country) {
    locationElement.textContent = json.city;
  } else {
    locationElement.textContent = json.country;
  }

  // set bio text
  if (json.bio) {
    bio.textContent = json.bio;
  } else {
    bio.textContent = 'bio not written';
  }
  // set profile picture
  if (json.usrImg) {
    profileImg.setAttribute('src', `/static/uploads/${json.usrImg}`);
  }
};

getUser();
