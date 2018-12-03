const displayName = document.querySelector('.display-name');
const locationElement = document.querySelector('.location');
const bio = document.querySelector('.bio-text');

fetch('/users/user')
  .then((response) => response.json())
  .then((json) => {
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
  })
  .catch((err) => console.log(err));

