'use strict';
const frm = document.querySelector('#mediaform');

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
  });
};

const testFields = () => {
  const displayName = frm.elements.namedItem('displayName').value;
  const bio = frm.elements.namedItem('bio').value;
  const email = frm.elements.namedItem('email').value;
  const city = frm.elements.namedItem('city').value;
  const file = frm.elements.namedItem('mediafile').value;
  console.log(file);

  if (displayName===''||!textPattern.test(displayName)) {
    displayName= oldUserData.displayName;
  }
  if (bio===''||!textPattern.test(bio)) {
    bio= oldUserData.bio;
  }
  if (email===''||!emailPattern.test(email)) {
    email= oldUserData.email;
  }
  if (city===''||!textPattern.test(city)) {
    city= oldUserData.city;
  }
  if (file==='') {
    file= oldUserData.profileImageId;
  }
};

const sendForm = (evt) => {
  getUserData();
  evt.preventDefault();
  testFields();
  const fd = new FormData(frm);
  const settings = {
    method: 'post',
    body: fd,
  };

  fetch('/user/settings', settings).then((response) => {
    return response.json();
  }).then((json) => {
    console.log(json);
  });
};

frm.addEventListener('submit', sendForm);
