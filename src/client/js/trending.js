// const trendingFeed = document.querySelector('#trending-feed');

const getFeed = () => {
  fetch('/trending')
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
    })
    .catch((err) => {
      alert(`SOS SOS ${err}`);
    });
};

getFeed();
