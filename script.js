"use strict";
const sketch = document.getElementById("grid");
const slider = document.querySelector(".slider");
const output = document.getElementsByTagName("label")[0];
const grid = document.getElementById("grid");
createGrid(Number(slider.value));

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function createGrid(value) {
  grid.style.gridTemplateColumns = `repeat(${value}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${value}, 1fr)`;

  for (let i = 0; i < value * value; i++) {
    let newDiv = document.createElement("div");
    newDiv.addEventListener("mouseover", paint);
    newDiv.addEventListener("mousedown", paint);
    grid.appendChild(newDiv);
  }
}

function paint(e) {
  if (e.type === "mouseover" && !mouseDown) return;
  if (true) e.target.style.backgroundColor = "black";
}

slider.oninput = function () {
  clearGrid();
  output.innerHTML = this.value;
  createGrid(this.value);
};

function clearGrid() {
  for (let j = sketch.childElementCount; j > 0; j--) {
    sketch.removeChild(sketch.firstChild);
  }
}
