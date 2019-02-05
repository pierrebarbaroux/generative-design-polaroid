import * as p5 from './libs/p5.min'

let s = function( p ) {
  // Polaroid Canvas
  let canvas, x, y, pola, polaTiles = [];

  // Settings
  let tiles = [], tileSize, strWeight, strokeColor;

  let dominantColor;
  const divId = "sketch";
  let started = false;

  let option;

  p.setup = () => {
    strWeight = 3;
    tileSize = 100;

    strokeColor = p.color(0);

    canvas = p.createCanvas(440, 510);
    canvas.parent(divId);
    p.background(255);

    pola = p.createGraphics(440, 510);

    let t0 = tile0(p.createGraphics(tileSize, tileSize));

    let t1 = tile1(p.createGraphics(tileSize, tileSize));
    let t2 = tile2(p.createGraphics(tileSize, tileSize));
    let t3 = tile3(p.createGraphics(tileSize, tileSize));
    let t4 = tile4(p.createGraphics(tileSize, tileSize));
    let t5 = tile5(p.createGraphics(tileSize, tileSize));

    option = p.round(p.random(1));

    switch (option) {
      case 1:
        polaTiles.push(t1);
        polaTiles.push(t2);
        polaTiles.push(t3);
        polaTiles.push(t4);
        polaTiles.push(t5);
        break;
      default:
        polaTiles.push(t0);
    }

    p.noLoop();
  }

  p.draw = () => {
    if (started) {

      strokeColor = p.color(dominantColor[0], dominantColor[1], dominantColor[2]);

      // Draw polaroid
      pola.background(255);
      pola.stroke(strokeColor);
      pola.strokeWeight(strWeight);

      // Paint the off-screen buffer onto the main canvas
      p.image(pola, 0, 0);

      // Draw each tiles in polaroid
      let tileMax = polaTiles.length - Number.EPSILON;

      for (let i = 0; i < pola.width; i += tileSize) {
        for (let j = 0; j < pola.height; j += tileSize) {
          let index = Math.floor(Math.random() * tileMax);
          p.push();
          p.translate(i + tileSize/2, j + tileSize/2);
          p.rotate(Math.floor(Math.random() * 3) * p.HALF_PI);
          p.translate(- tileSize/2, - tileSize/2);
          p.image(polaTiles[index], 0, 0);
          p.pop();
        }
      }
    }
  }

  /**
   * First truchet
   * @param  {[Object]} pg graphics
   * @return {[Object]} pg graphics
   */
  const tile0 = (pg) => {
    pg.noFill();
    pg.stroke(strokeColor);
    pg.strokeWeight(strWeight);

    pg.arc(pg.width, 0, pg.width, pg.width, p.HALF_PI, p.PI);
    pg.arc(0, pg.height, pg.width, pg.width, p.PI + p.HALF_PI, 0);

    return pg;
  }



  /**
   * Second truchet
   * @param  {[Object]} pg graphics
   * @return {[Object]} pg graphics
   */

   const tile1 = (pg) => {
    pg.noFill();
    pg.stroke(strokeColor);
    pg.strokeWeight(strWeight);

    pg.line(0, pg.height/3, pg.width/2, pg.height/3);
    pg.arc(pg.width/2, pg.height/2, pg.width/3, pg.height/3, -p.HALF_PI, 0);

    pg.line(pg.width/2, 2*pg.height/3, pg.width, 2*pg.height/3);
    pg.arc(pg.width/2, pg.height/2, pg.width/3, pg.height/3, p.HALF_PI, p.PI);

    pg.line(2*pg.height/3, pg.height/2, 2*pg.width/3, pg.height);
    pg.line(pg.height/3, 0, pg.width/3, pg.height/2);

    pg.arc(pg.width, 0, 2*pg.width/3, 2*pg.height/3, p.HALF_PI, p.PI);
    pg.arc(0, pg.height, 2*pg.width/3, 2*pg.height/3, -p.HALF_PI, 0);

    return pg;
  }

  const tile2 = (pg) => {
    pg.noFill();
    pg.stroke(strokeColor);
    pg.strokeWeight(strWeight);

    pg.line(0, pg.height/3, pg.width/2, pg.height/3);
    pg.line(pg.width/3, 0, pg.width/3, pg.height);
    pg.line(0, 2*pg.height/3, pg.width, 2*pg.height/3);
    pg.line(2*pg.width/3, 0, 2*pg.width/3, pg.height);
    pg.line(pg.width/2, pg.height/3, pg.width, pg.height/3);

    return pg;
  }

  const tile3 = (pg) => {
    pg.noFill();
    pg.stroke(strokeColor);
    pg.strokeWeight(strWeight);

    pg.arc(pg.width/2, 0, pg.width/3, pg.height/3, 0, p.PI);
    pg.arc(pg.width, pg.height/2, pg.width/3, pg.height/3, p.HALF_PI, 3 * p.HALF_PI);
    pg.arc(pg.width/2, pg.height, pg.width/3, pg.height/3, p.PI, p.TAU);
    pg.arc(0, pg.height/2, pg.width/3, pg.height/3, -p.HALF_PI, p.HALF_PI);

    return pg;
  }

  const tile4 = (pg) => {
    pg.noFill();
    pg.stroke(strokeColor);
    pg.strokeWeight(strWeight);

    pg.arc(pg.width/2, 0, pg.width/3, pg.height/3, 0, p.PI);
    pg.arc(pg.width/2, pg.height, pg.width/3, pg.height/3, p.PI, p.TAU);
    pg.bezier(0, pg.height/3, pg.width/2, pg.height/3, pg.width/2, 2*pg.height/3, pg.width, 2*pg.height/3);
    pg.bezier(0, 2*pg.height/3, pg.width/2, 2*pg.height/3, pg.width/2, pg.height/3, pg.width, pg.height/3);

    return pg;
  }

  const tile5 = (pg) => {
    pg.noFill();
    pg.stroke(strokeColor);
    pg.strokeWeight(strWeight);

    pg.arc(0, 0, 2*pg.width/3, 2*pg.height/3, 0, p.HALF_PI);
    pg.arc(0, pg.height, 2*pg.width/3, 2*pg.height/3, -p.HALF_PI, 0);
    pg.arc(pg.width, 0, 2*pg.width/3, 2*pg.height/3, p.HALF_PI, p.PI);
    pg.arc(pg.width, pg.height, 2*pg.width/3, 2*pg.height/3, p.PI, 3*p.HALF_PI);

    return pg;
  }

  p.start = (color) => {
    dominantColor = color;
    started = true;
  }
};

export default class Polaroid {
  constructor() {
    this.p5 = new p5(s);
  }
  start(color) {
    this.p5.start(color);
  }
}
