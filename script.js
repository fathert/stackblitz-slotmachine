

const symbols = [
  './symbols/banana.svg',
  './symbols/orange.svg',
  './symbols/cherry.svg',
  './symbols/lemon.svg',
  './symbols/aubergine.svg',
  './symbols/bell.svg',
  './symbols/ice.svg',
  './symbols/avocado.svg',
  './symbols/touch.svg',
  './symbols/lick.svg',
  './symbols/peach.svg',
  './symbols/kiss.svg'
];

//for (var i = 0; i < 1000; i++) {
const spinTime = 5;
const symbolCount = symbols.length;
const symbolPad = 4;
const symbolHeight = 100;

const reelHeight = 450;
const stripLength = symbolCount * (symbolHeight + symbolPad);
const stripMargin = 0;

const startSymbol = 0; //Math.floor((Math.floor(Math.random() * 6)));



merge(symbols).then((imageStrip) => {
  var strip = document.getElementById('reel1');
  strip.style.backgroundImage = `url(${imageStrip.image})`;
  var strip = document.getElementById('reel2');
  strip.style.backgroundImage = `url(${imageStrip.image})`;
  var strip = document.getElementById('reel3');
  strip.style.backgroundImage = `url(${imageStrip.image})`;

  const button = document.getElementById('button');
  button.addEventListener('click', event => {
    console.log('button clicked');
    handleSpin();
  });
});

function merge(symbols) {
  return new Promise((resolve, reject) => {
    Promise.all(symbols.map((symbol) => loadImage(symbol)))
      .then((images) => {
        var canvas = document.createElement('canvas');
        canvas.style.display = 'none';
        const ctx = canvas.getContext('2d');

        canvas.width = 100 + stripMargin * 2;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1.0;
        canvas.height = (symbolHeight + symbolPad) * images.length;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        images.reduce((start, image, i) => {
          ctx.drawImage(
            image,
            stripMargin,
            start,
            canvas.width,
            symbolHeight
          );

          ctx.fillStyle = 'black';
          ctx.font = "50px Arial";
          const text = `${i}`;
          const metrics = ctx.measureText(text);
          const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
          ctx.strokeText(
            text,
            (canvas.width - metrics.width) / 2,
            start + ((symbolHeight + textHeight) / 2)
          );

          return start += (symbolHeight + symbolPad);
        }, 0);
        var image = canvas.toDataURL('image/jpeg');
        canvas.remove();
        resolve({
          height: canvas.height,
          width: canvas.width,
          image
        });
      });
  })
};

function loadImage(path) {
  // console.log(`Loading: ${path}`);
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

function handleSpin() {
  doSpin('reel1', 25, Math.floor(Math.random() * symbolCount));
  doSpin('reel2', 35, Math.floor(Math.random() * symbolCount));
  doSpin('reel3', 45, Math.floor(Math.random() * symbolCount));
}

function doSpin(containerId, spins, selectSymbol) {
  var strip = document.getElementById(containerId);

  var startY = stripLength - (startSymbol * (symbolHeight + symbolPad)) + (symbolPad / 2);
  startY += -((symbolHeight + symbolPad) / 2);
  startY += (reelHeight / 2);

  var endY = stripLength - (selectSymbol * (symbolHeight + symbolPad)) + (symbolPad / 2);
  endY += -((symbolHeight + symbolPad) / 2);
  endY += (reelHeight / 2);

  endY += spins * stripLength;

  console.log(`Start: ${startY}, end: ${endY}`);

  const animateTime = spinTime * 1000;
  const animation = strip.animate(
    [
      { backgroundPositionY: `${startY}px`, easing: 'ease' },
      { backgroundPositionY: `${endY}px`, easing: 'ease' },
    ],
    {
      fill: 'forwards',  // In conjunction with commitStyles() keeps the final animation state
      duration: animateTime,
      iterations: 1,
    }
  );
  //animation.pause();

  animation.finished.then((a) => {
    a.commitStyles();
    a.cancel();
  });

  //strip.style.backgroundPositionY = `${endY}px`;
  //animation.commitStyles();
}