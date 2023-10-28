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

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
let firstCard = null;
let secondCard = null;
let clicks = 0;

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    const newImg = document.createElement('img');
    newImg.src = color;
    newImg.classList.add('card-img');
    // give it a class attribute for the value we are looping over
    newDiv.append(newImg);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  const clickedCard = event.target;
  
  if(clickedCard.classList.contains('matched')){
    return;
  }

  const clickedImg = clickedCard.querySelector('img');
if(clickedImg){
  if(firstCard === null){
    firstCard = clickedCard;
    clickedImg.style.display = 'block';
  } else if (secondCard === null && firstCard !== clickedCard){
    secondCard = clickedCard;
    clickedImg.style.display = 'block';
    
    clicks++;

    if(firstCard.querySelector('img').src === secondCard.querySelector('img').src){
      firstCard.classList.add('matched');
      secondCard.classList.add('matched');

      firstCard = null;
      secondCard = null;

      if (document.querySelectorAll('.card-img').length === document.querySelectorAll('.matched').length) {
        endGame(clicks);
        
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
  updateClicks();
  
}

function endGame(counts){
  alert('You Won!');
  resetGame();
  const bestScored = localStorage.getItem('bestScore');
  if(bestScored === null || counts < bestScored){
    localStorage.setItem('bestScore', counts);
  }
  bestScore();

}

function bestScore(){
  const bestScored = localStorage.getItem('bestScore');
  // console.log(bestScored);
  if(bestScored !== null){
    const score = document.getElementById('best-score-display');
    score.textContent =  `Best Score: ${bestScored}`;
    
  }
}

const clicksDisplay = document.getElementById('clicks');

function updateClicks(){
  clicksDisplay.textContent = `Number of Clicks: ${clicks}`;
}

function startGame(){
    gameContainer.innerHTML = '';
    shuffledColors = shuffle(COLORS);
    createDivsForColors(shuffledColors);
    clicks = 0;
    updateClicks();
    
    
}

startButton.addEventListener('click', startGame);

function resetGame() {
  gameContainer.innerHTML = '';
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  startGame();
}
bestScore();


resetBtn.addEventListener('click', resetGame);

