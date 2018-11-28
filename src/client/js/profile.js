const displayName = document.querySelector('.profile-wrapper__info__display-name');

console.log(displayName.innerHTML);

fetch('/users/tester')
  .then((response) => response.json())
  .then((json) => {
    if (!json.success) {
      alert(json.error);
      return;
    }
  })
  .catch((err) => {
    console.log(err);
  });

