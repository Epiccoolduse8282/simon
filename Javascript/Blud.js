const squares = document.querySelectorAll(".square");
const clickedSquareText = document.querySelector("#clicked-square");
const startButton = document.querySelector(".start-button");

let colors = ["Yellow", "Blue", "Red", "Green"];
let colorhistory = [];

let green = false;
let blue = false;
let yellow = false;
let red = false;

let roll = false;
let order = 0;
let currentcolor = null;
let playerturn = false;

function normalSquares() {
  squares.forEach((square) => {
    square.style.backgroundColor = "";
    square.style.filter = "brightness(1)";
    square.style.boxShadow = "none";
    square.style.transform = "scale(1)";
  });
}

function lightSquare(color) {
  const currentSquare = document.querySelector(`[data-color="${color}"]`);

  currentSquare.style.backgroundColor = "white";
  currentSquare.style.filter = "brightness(1)";
  currentSquare.style.boxShadow = "none";
  currentSquare.style.transform = "scale(1.18)";

  setTimeout(() => {
    currentSquare.style.backgroundColor = "";
    currentSquare.style.filter = "brightness(1)";
    currentSquare.style.boxShadow = "none";
    currentSquare.style.transform = "scale(1)";
  }, 650);
}

function randomColor() {
  const random = Math.random();

  green = false;
  blue = false;
  yellow = false;
  red = false;

  if (random < 0.25) {
    green = true;
    currentcolor = "Green";
  } else if (random < 0.5) {
    red = true;
    currentcolor = "Red";
  } else if (random < 0.75) {
    yellow = true;
    currentcolor = "Yellow";
  } else {
    blue = true;
    currentcolor = "Blue";
  }

  colorhistory.push(currentcolor);
}

function showColors() {
  playerturn = false;
  order = 0;

  for (let i = 0; i < colorhistory.length; i++) {
    setTimeout(() => {
      lightSquare(colorhistory[i]);
    }, i * 900);
  }

  setTimeout(() => {
    playerturn = true;
    clickedSquareText.textContent = "ur turn";
  }, colorhistory.length * 900);
}

function nextRound() {
  randomColor();
  clickedSquareText.textContent = `Round ${colorhistory.length}`;

  setTimeout(() => {
    showColors();
  }, 600);
}

startButton.addEventListener("click", () => {
  roll = true;
  playerturn = false;
  order = 0;
  colorhistory = [];

  green = false;
  blue = false;
  yellow = false;
  red = false;

  normalSquares();
  nextRound();
});

squares.forEach((square) => {
  square.addEventListener("click", () => {
    const color = square.dataset.color;

    console.log(`${color} square clicked`);

    if (!roll || !playerturn) return;

    lightSquare(color);
    clickedSquareText.textContent = `${color} square clicked`;

    if (color === colorhistory[order]) {
      order++;

      if (order === colorhistory.length) {
        playerturn = false;
        clickedSquareText.textContent = "Correct";

        setTimeout(() => {
          nextRound();
        }, 900);
      }
    } else {
      clickedSquareText.textContent = `Wrong. Score: ${colorhistory.length - 1}`;
      roll = false;
      playerturn = false;
      order = 0;
    }
  });
});