const gameContainer = document.getElementById("game");
const startButton = document.getElementById("start-button");
const restartButton = document.getElementById("restart-button");
const scoreDisplay = document.getElementById("score-display");

const IMAGES_FOLDER = "Images/Porsche/";
const IMAGES = [
    "porsche1.jpg",
    "porsche2.jpg",
    "porsche3.jpg",
    "porsche4.jpg",
    "porsche5.jpg",
    "porsche6.jpg"
];

let score = 0;
let firstCard = null;
let secondCard = null;

startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

function startGame() {
    // Clear the game container
    gameContainer.innerHTML = "";

    // Shuffle the images
    const shuffledImages = shuffleImages(IMAGES);

    // Create the card elements
    createDivsForImages(shuffledImages);

    // Reset the score
    score = 0;
    updateScore();
}

function restartGame() {
    startGame();
}

function createDivsForImages(imageArray) {
    for (let image of imageArray) {
        const newDiv = document.createElement("div");
        newDiv.style.backgroundImage = `url(${IMAGES_FOLDER}${image})`;
        newDiv.classList.add("card");
        newDiv.addEventListener("click", handleCardClick);
        gameContainer.append(newDiv);
    }
}

function handleCardClick(event) {
    const clickedCard = event.target;

    if (clickedCard === firstCard || clickedCard.classList.contains("matched")) {
        return;
    }

    clickedCard.style.backgroundColor = "black";

    if (!firstCard) {
        firstCard = clickedCard;
    } else if (!secondCard) {
        secondCard = clickedCard;

        if (firstCard.style.backgroundImage === secondCard.style.backgroundImage) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            // Increment the score when a match is found
            score += 10;
            updateScore();
            firstCard = null;
            secondCard = null;
        } else {
            setTimeout(function () {
                firstCard.style.backgroundColor = "";
                secondCard.style.backgroundColor = "";
                firstCard = null;
                secondCard = null;
            }, 1000);
        }
    }
}

function updateScore() {
    scoreDisplay.textContent = "Score: " + score;
}

function shuffleImages(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Start the game when the page loads
startGame();
