import * as p5 from './libs/p5.min'

let s = function( p ) {
  // Polaroid Canvas
  let canvas, x, y, pola, polaTiles = [];

  // Settings
  let tiles = [], tileSize, strWeight, strokeColor;

  // Image params
  let imageSize;

  let dominantColor;
  let started = false;

  p.setup = () => {
    strWeight = 3;
    tileSize = 100;

    imageSize = 350;

    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    p.background(255);

    pola = p.createGraphics(440, 510);

    // Center canvas
    // x = (p.windowWidth - canvas.width) / 2;
    // y = (p.windowHeight - canvas.height) / 2;
    // canvas.position(x, y);


    // Create each tiles
    // width and height of the canvas
    for (let i = 0; i < canvas.width; i += tileSize) {
      for (let j = 0; j < canvas.height; j += tileSize) {
        tiles.push(new Truchet(i, j, tileSize));
      }
    }

    for (let i = 0; i < pola.width; i += tileSize / 2) {
      for (let j = 0; j < pola.height; j += tileSize / 2) {
        polaTiles.push(new TruchetPola(i, j, tileSize / 2, pola));
      }
    }
  }

  p.draw = () => {
    if(started) {

      strokeColor = p.color(dominantColor[0], dominantColor[1], dominantColor[2]);
      p.noFill();
      p.stroke(strokeColor);
      p.strokeWeight(strWeight);

      // Draw each tiles in background
      for (let i = 0; i < tiles.length; i++) {
        tiles[i].drawTile();
      }

      // Draw polaroid
      pola.background(255);
      pola.stroke(p.color(dominantColor[0], dominantColor[1], dominantColor[2]));
      pola.strokeWeight(strWeight);

      // Draw each tiles in polaroid
      for (let i = 0; i < polaTiles.length; i++) {
        polaTiles[i].drawTile();
      }

      // Paint the off-screen buffer onto the main canvas
      p.image(pola, 0, 0);

      // Draw black rect of the polaroid
      p.fill(0);
      p.noStroke();
      let x = (p.windowWidth - imageSize) / 2;
      let y = (p.windowHeight - imageSize - 80) / 2;
      p.rect(x, y, imageSize, imageSize);
    }
  }

  p.windowResized = () => {
  	// p.resizeCanvas(p.windowWidth, p.windowHeight);
  }

  // Truchet class
  function Truchet(x, y, width) {

    // Two tiles possibilities
    const option = p.round(p.random(1));

    this.drawTile = function() {

      switch (option) {
        case 0:
        // Two 1/4 circle on top right and bottom left corners
        p.arc(x + width, y, width, width, p.HALF_PI, p.PI);
        p.arc(x, y + width, width, width, p.PI + p.HALF_PI, 0);
          break;

        // Two 1/4 circle on top left and bottom right corners
        default:
        p.arc(x, y, width, width, p.TWO_PI, p.HALF_PI);
        p.arc(x + width, y + width, width, width, p.PI, p.PI + p.HALF_PI);
      }

    }
  }

  p.start = (color) => {
    dominantColor = color;
    started = true;
  }
};

export default class Background {
  constructor() {
    this.p5 = new p5(s);
  }
  start(color) {
    this.p5.start(color);
  }
}
