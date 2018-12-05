'use strict';
const frm = document.querySelector('#mediaform');
const picForm = document.querySelector('#profile-pic-form');
const sendProfile = document.querySelector('#form');
const image = document.querySelector('#image');

const textPattern = /^\S*$/; // no spaces allowed
const emailPattern = /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

let oldUserData;

const getUserData = () => {
  const settings = {
    method: 'get',
  };
  fetch('/users/user', settings).then((response) => {
    return response.json();
  }).then((json) => {
    oldUserData = json;
    frm.elements.namedItem('displayName').value = oldUserData.displayName;
    frm.elements.namedItem('bio').value = oldUserData.bio;
    frm.elements.namedItem('email').value = oldUserData.email;
    frm.elements.namedItem('city').value = oldUserData.city;
    console.log(oldUserData.usrImg);
    image.setAttribute('src', `/static/uploads/${oldUserData.usrImg}`)
  });
};

const testFields = () => {
  let displayName = frm.elements.namedItem('displayName').value;
  let bio = frm.elements.namedItem('bio').value;
  let email = frm.elements.namedItem('email').value;
  let city = frm.elements.namedItem('city').value;
  let file = frm.elements.namedItem('mediafile').value;
  console.log(file);
  console.log(bio);
  if (displayName === '' || !textPattern.test(displayName)) {
    displayName = oldUserData.displayName;
  }
  if (!textPattern.test(bio)) {
    bio = oldUserData.bio;
  }
  if (email === '' || !emailPattern.test(email)) {
    email = oldUserData.email;
  }
  if (city === '' || !textPattern.test(city)) {
    city = oldUserData.city;
  }
  if (file === '') {
    file = oldUserData.profileImageId;
  }
};

const sendForm = (evt) => {
  evt.preventDefault();
  // testFields();
  const settings = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      displayName: frm.elements.namedItem('displayName').value,
      bio: frm.elements.namedItem('bio').value,
      city: frm.elements.namedItem('city').value,
      email: frm.elements.namedItem('email').value,
    }),
  };
  fetch('/user/settings', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    getUserData();
  });
};

const sendPicture = (evt) => {
  evt.preventDefault();
  const fd = new FormData(picForm);
  const settings = {
    method: 'post',
    body: fd,
  };
  fetch('/user/settings/file', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
    getUserData();
  });
};

getUserData();

sendProfile.addEventListener('click', sendForm);
picForm.addEventListener('submit', sendPicture);
