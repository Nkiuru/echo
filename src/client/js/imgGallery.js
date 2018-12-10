const gridContainer = document.querySelector('#grid-container');

const landimg1 = '/static/img/landImg_01.jpg';
const landimg2 = '/static/img/landImg_02.jpg';
const landimg3 = '/static/img/landImg_03.jpg';
const landimg4 = '/static/img/landImg_04.jpg';
const landimg5 = '/static/img/landImg_05.jpg';
const landimg6 = '/static/img/landImg_06.jpg';
const landimg7 = '/static/img/landImg_07.jpg';
const landimg8 = '/static/img/landImg_08.jpg';
const landimg9 = '/static/img/landImg_09.jpg';
const landimg10 = '/static/img/landImg_10.jpg';
const landimg11 = '/static/img/landImg_11.jpg';
const landimg12 = '/static/img/landImg_12.jpg';
const landimg13 = '/static/img/landImg_13.jpg';
const landimg14 = '/static/img/landImg_14.jpg';
const landimg15 = '/static/img/landImg_15.jpg';
const landimg16 = '/static/img/landImg_16.jpg';
const landimg17 = '/static/img/landImg_17.jpg';

const images = [landimg1, landimg2, landimg3, landimg4, landimg5,
                landimg6, landimg7, landimg8, landimg9, landimg10,
                landimg11, landimg12, landimg13, landimg14, landimg15,
                landimg16, landimg17];

let gridPiece = '';

const createGridPiece = () => {
  gridPiece = document.createElement('div');
  gridPiece.classList.add('grid-piece');
  gridPiece.style.backgroundImage = `url(${rnd()})`;
  return gridPiece;
};

const rnd = () => {
  const image = images[Math.floor(Math.random() * images.length)];
  return image;
};

const createGrid = () => {
  for (let i = 1; i < 6; i++) {
    const pieceContainer = document.createElement('div');
    pieceContainer.classList.add('piece-container');

    const gridPieces = [];

    createGridPiece();
    pieceContainer.appendChild(gridPiece);

    gridContainer.appendChild(pieceContainer);
    gridPieces.push(gridContainer);
  }
};

createGrid();

document.addEventListener('DOMContentLoaded', (e) => {
  const pieces = document.getElementsByClassName('grid-piece');

  console.log(pieces.item(1));

  const rndPiece = () => {
    const randomPiece = Math.floor(Math.random() * 5);
    return randomPiece;
  };

  for (let i = 0; i < pieces.length; i++) {
    const x = 1;
    pieces[i].id = x + i;
  }

  const shuffle = () => {
    const nro = rndPiece();
    const random = rnd();
    pieces[nro].style.backgroundImage = `url(${random})`;
    console.log('image changed');
    setTimeout(shuffle, 8000);
  };
  shuffle();
});
