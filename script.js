console.log('Hello!');

merge();
//for (var i = 0; i < 1000; i++) {
const spins = 30;
const spinTime = 1;
const symbols = 6;
const symbolPad = 4;
const symbolHeight = 100;

const startY = 0;
var endY = (symbolHeight + symbolPad) * symbols * spins;

const selectedSymbol = 0; //Math.floor((Math.floor(Math.random() * 6)));

endY += (symbols - selectedSymbol + 2) * (symbolHeight + symbolPad);

const animateTime = spinTime * 1000;

// console.log(`Symbol ${i} Y: ${startY} -> ${endY}`);
var strip = document.getElementById('strip');

const animation = strip.animate(
  [
    { backgroundPositionY: `${startY}px`, easing: 'ease' },
    { backgroundPositionY: `${endY}px`, easing: 'ease' },
  ],
  {
    duration: animateTime,
    iterations: 1,
  }
);

animation.onfinish = () => {
  console.log('Finshed, setting to ', endY);
  strip.style.backgroundPositionY = `${endY}px`;
};

// animation.currentTime = i * offset;
//}

// src="https://www.svgrepo.com/show/227289/banana.svg"
// src="https://www.svgrepo.com/show/298621/cherry.svg"

function merge() {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
  


  var canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');

  canvas.width = 100;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1.0;

  Promise.all([
    loadImage('./symbols/banana.svg'),
    loadImage('./symbols/cherry.svg'),
    loadImage('./symbols/lemon.svg'),
    loadImage('./symbols/aubergine.svg'),
    loadImage('./symbols/bell.svg'),
    loadImage('./symbols/avocado.svg'),
  ]).then((images) => {
    console.log('Images: ', images);
    canvas.height = (symbolHeight + symbolPad) * images.length;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    images.reduce((_, image, i) => {
      console.log(i, image);
      ctx.drawImage(
        image,
        0,
        i * (symbolHeight + symbolPad),
        100,
        symbolHeight
      );
      return;
    }, '');
    var img = canvas.toDataURL('image/jpeg');
    var strip = document.getElementById('strip');
    strip.style.backgroundImage = `url(${img})`;
  });
}

function loadImage(path) {
  console.log(`Loading: ${path}`);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = path;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (e) => {
      reject(e);
    };
  });
}

