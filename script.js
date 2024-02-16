"use strict";

const GRID = document.getElementById("grid"); //drawing area
const PALLETE = document.getElementById("color-picker") // color picker
const COLOR_OUT = document.getElementById("color-indicator") // color indicator txt
const SIZER = document.querySelector(".sizer"); // size setter
const SIZE_OUT = document.getElementById("size-indicator") //size indicator txt
const RESTART = document.getElementById("reset"); //reset button
const FOOTER = document.getElementById("footer") // footer

const DEFAULT_SIZE = 30;
const DEFAULT_COLOR = "Black";

// automatic year updates for footer.
let date = new Date()
let year = date.getFullYear()
FOOTER.innerHTML = FOOTER.textContent + year


// reset button action
RESTART.addEventListener('click', reset)

// color picker action
PALLETE.addEventListener('input', ()=>{
  COLOR_OUT.innerHTML = 'Color: ' + PALLETE.value})

//size buttin action
SIZER.addEventListener('input', ()=>{
  createGrid(Number(SIZER.value));
} )


//create default-setting grid
createGrid(Number(SIZER.value));

// detect mouse click  -- TODO
let mouseDown = false;
document.body.onmousedown = () => {mouseDown = true};
document.body.onmouseup = () => {mouseDown = false};

function createGrid(value) {
  if(value < 120){  // this function creates a grid basd on chosen size
    GRID.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
    GRID.style.gridTemplateRows = `repeat(${value}, 1fr)`;

    // create a square grid with size*size dimensions
    for (let i = 0; i < value * value; i++) {
      let newDiv = document.createElement("div");
      newDiv.style.border = '.1px solid rgba(112,112,112,0.05)';
      newDiv.addEventListener("mouseover", paint);
      newDiv.addEventListener("mousedown", paint);
      GRID.appendChild(newDiv);
    }
  }
}


function paint(e) {
// apply set color to pixels pointeed at by mouse & click or erasing a pixel with ctrl+click
  if (e.type === "mouseover" && !mouseDown) return;
  if (e.type === "mouseover"  && e.ctrlKey || e.type === "mousedown"  && e.ctrlKey) {
    e.target.style.backgroundColor = 'whitesmoke';
  } else {
    let color = document.getElementById("color-picker").value;
    e.target.style.backgroundColor = color;
  }
}


// clean the grid from paint.
function clearGrid() {
  for (let j = GRID.childElementCount; j > 0; j--) {
    GRID.removeChild(GRID.firstChild);
  }
}


function reset() {
  // reset the grid and settings to defaults
  clearGrid();
  SIZER.value =  DEFAULT_SIZE;
  SIZE_OUT.innerHTML = "Size: " +  30;
  PALLETE.value = '#000';
  COLOR_OUT.innerHTML = "Color: " + "Black" 
  createGrid(Number(SIZER.value));
}

// rebuild the grid after size change
SIZER.oninput = function () {
  clearGrid();
  SIZE_OUT.innerHTML = "Size: "+ this.value;
  createGrid(this.value);
};