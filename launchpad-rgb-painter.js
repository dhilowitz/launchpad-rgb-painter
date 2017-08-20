'use strict';
const Launchpad = require( 'launchpad-mk2' );

let myLaunchpad = new Launchpad({
  in: 0,
  out: 0
})
 
const COLORS = [
  {r:63, g:63, b:63},
  {r:63, g:0, b:0},
  {r:63, g:31, b:0},
  {r:63, g:63, b:0},
  {r:0, g:63, b:0},
  {r:0, g:0, b:63},
  {r:5, g:0, b:20},
  {r:36, g:0, b:52},
]

let currentColor = 0;
let grid = new Array();

for (let i=0;i<8;i++) {
  grid[i] = new Array();
  for (let j=0;j<8;j++) {
    grid[i][j]=null;
  }
}

myLaunchpad.darkAll();
myLaunchpad.getButton(8,9).setRgbColor(COLORS[0].r, COLORS[0].g, COLORS[0].b);
myLaunchpad.getButton(7,9).setRgbColor(COLORS[1].r, COLORS[1].g, COLORS[1].b);
myLaunchpad.getButton(6,9).setRgbColor(COLORS[2].r, COLORS[2].g, COLORS[2].b);
myLaunchpad.getButton(5,9).setRgbColor(COLORS[3].r, COLORS[3].g, COLORS[3].b);
myLaunchpad.getButton(4,9).setRgbColor(COLORS[4].r, COLORS[4].g, COLORS[4].b);
myLaunchpad.getButton(3,9).setRgbColor(COLORS[5].r, COLORS[5].g, COLORS[5].b);
myLaunchpad.getButton(2,9).setRgbColor(COLORS[6].r, COLORS[6].g, COLORS[6].b);
myLaunchpad.getButton(1,9).setRgbColor(COLORS[7].r, COLORS[7].g, COLORS[7].b);


myLaunchpad.on("press", pressInfo => {
  if(pressInfo.button) {
    // console.log(pressInfo.button, pressInfo.velocity)
    let x = pressInfo.button.x, y=pressInfo.button.y;

    if(x == 9) {
      currentColor = 8 - y;
      // console.log("Current color is " + currentColor);
    } else if(x<9) {
      if(grid[x-1][y-1] == COLORS[currentColor]) {
        grid[x-1][y-1] = null;
      } else {
        grid[x-1][y-1] = COLORS[currentColor];
      }

      if(grid[x-1][y-1]) {
        pressInfo.button.setRgbColor(COLORS[currentColor].r, COLORS[currentColor].g, COLORS[currentColor].b);
      } else {
        pressInfo.button.darken();
      }
    }
  }
})

myLaunchpad.on("release", button => {
  if(button) {
    // console.log(button)
  }
})