import * as p5 from './libs/p5.min'

let s = function( p ) {
  // Polaroid Canvas
  let canvas, x, y, pola, polaTiles = [];

  // Settings
  let tiles = [], tileSize, strWeight, strokeColor;

  let dominantColor;
  const divId = "test";
  let started = false;

  p.setup = () => {
    strWeight = 3;
    tileSize = 100;

    canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent(divId);
    p.background(247);

    // Create each tiles
    // width and height of the canvas
    for (let i = 0; i < canvas.width; i += tileSize) {
      for (let j = 0; j < canvas.height; j += tileSize) {
        tiles.push(new Truchet(i, j, tileSize));
      }
    }
  }

  p.draw = () => {
    if(started) {
      strokeColor = p.color(255);
      p.noFill();
      p.stroke(strokeColor);
      p.strokeWeight(strWeight);

      // Draw each tiles in background
      for (let i = 0; i < tiles.length; i++) {
        tiles[i].drawTile();
      }
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
