const gameContainer = document.getElementById("game");
const resetBtn = document.getElementById("reset");
const startButton = document.getElementById("start-button");
const COLORS = [
  "p1.png",
  "p1.png",
  "p2.png",
  "p2.png",
  "p3.png",
  "p3.png",
  "p4.png",
  "p4.png"
];

// Helper function to shuffle an array
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    const newImg = document.createElement('img');
    newImg.src = color;
    newImg.classList.add('card-img');
    newDiv.append(newImg);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let firstCard = null;
let secondCard = null;
let score = 0;
let bestScore = localStorage.getItem('bestScore') || Infinity;

function handleCardClick(event) {
  const clickedCard = event.target;

  if(clickedCard.classList.contains('matched') || clickedCard === firstCard){
    return;
  }

  const clickedImg = clickedCard.querySelector('img');

  if(firstCard === null){
    firstCard = clickedCard;
    clickedImg.style.display = 'block';
  } else if (secondCard === null){
    secondCard = clickedCard;
    clickedImg.style.display = 'block';

    if(firstCard.querySelector('img').src === secondCard.querySelector('img').src){
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');

      firstCard = null;
      secondCard = null;
      score += 10;
      updateScore();

      if (document.querySelectorAll('.card').length === document.querySelectorAll('.matched').length) {
        endGame();
      }

    } else {
      setTimeout(function() {
        firstCard.querySelector('img').style.display = 'none';
        secondCard.querySelector('img').style.display = 'none';

        firstCard = null;
        secondCard = null;
      }, 1000);
    }
  }
}

const scoreDisplay = document.getElementById("score-display");

function updateScore(){
  scoreDisplay.textContent = 'Score: ' + score;

  if(score < bestScore){
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
  }
}

const bestScoreDisplay = document.getElementById('best-score-display');

function startGame(){
  gameContainer.innerHTML = '';
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  score = 0;
  updateScore();
  bestScoreDisplay.textContent = "Best Score: " + bestScore;
}

startButton.addEventListener('click', startGame);

function resetGame() {
  gameContainer.innerHTML = '';
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  startGame();
}

resetBtn.addEventListener('click', resetGame);
bestScoreDisplay.textContent = 'Best Score: ' + bestScore;

startGame();
