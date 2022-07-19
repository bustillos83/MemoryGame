//Start by creating HTML and CSS elements
//get image sources from the web
//I want the cards to be centered in the screen with big font for the score and moves.
//custom title
//wnat the cards to flip and then flip back if not match
//when player matches images alert they matched
//when player selects wrong images aler theyre wrong and to try again
//alert when wrong and ask to start again
//goal to add music
//goal to add sound when click card

//Array of cards, two of each so it compares them to match

let cardArray = [
  {
    name: "seiya",
    img: "https://i.imgur.com/T3IdE3N.jpg",
  },
  {
    name: "seiya",
    img: "https://i.imgur.com/T3IdE3N.jpg",
  },
  {
    name: "marin",
    img: "https://i.imgur.com/CaJoxHK.jpg",
  },
  {
    name: "marin",
    img: "https://i.imgur.com/CaJoxHK.jpg",
  },
  {
    name: "shun",
    img: "https://i.imgur.com/0aGBqin.jpg",
  },
  {
    name: "shun",
    img: "https://i.imgur.com/0aGBqin.jpg",
  },
  {
    name: "shiryu",
    img: "https://i.imgur.com/kSuQadc.jpg",
  },
  {
    name: "shiryu",
    img: "https://i.imgur.com/kSuQadc.jpg",
  },
  {
    name: "ikki",
    img: "https://i.imgur.com/ruR8kiZ.jpg",
  },
  {
    name: "ikki",
    img: "https://i.imgur.com/ruR8kiZ.jpg",
  },
  {
    name: "hyoga",
    img: "https://i.imgur.com/v3r0gpZ.jpg",
  },
  {
    name: "hyoga",
    img: "https://i.imgur.com/v3r0gpZ.jpg",
  },
];

//define variables and get DOM element
//using DOMContentLoaded so it load HTML without waiting for images and such
let grid = document.querySelector(".grid");
let audio = document.querySelector("audio");
let source = document.querySelector("#source");
let scoreBoard = document.querySelector(".scoreBoard");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let clickBoard = document.querySelector(".clickBoard");
let imgs;
let cardsId = [];
let cardsSelected = [];
let cardsWon = 0;
let clicks = 0;
document.addEventListener("DOMContentLoaded", function () {
  //board function
  //creates board with the images

  createBoard(grid, cardArray);
  arrangeCard();
  playAgain.addEventListener("click", replay);

  //listens for 'click'

  imgs = document.querySelectorAll("img");
  Array.from(imgs).forEach((img) => img.addEventListener("click", flipCard));
});
//createBoard function
//removes popup over images

function createBoard(grid, array) {
  popup.style.display = "none";
  array.forEach((arr, index) => {
    let img = document.createElement("img");
    img.setAttribute("src", "https://i.imgur.com/7rhDR2Q.jpg");
    img.setAttribute("data-id", index);
    grid.appendChild(img);
  });
}

// arrangeCard function

function arrangeCard() {
  cardArray.sort(() => 0.5 - Math.random());
}

// flip Card function
//looks for 'click', once the image is clicked it gets the ID number.
//this function checks if both images are the same.

function flipCard() {
  let selected = this.dataset.id;
  let clicked = cardArray[selected].name;
  cardsSelected.push(clicked);

  cardsId.push(selected);
  this.classList.add("flip");
  this.setAttribute("src", cardArray[selected].img);
  if (cardsId.length === 2) {
    setTimeout(checkForMatch, 500);
  }
}
// checkForMatch function
//once images are clicked wait around 5 seconds, then it calls the checkForMath function
//this function gets all images from the array, then gets IDs and checks if the values are the same
//if images are the same then it adds to the number of cards won and alerts the user
//if not the same then it just flips the image back and also alerts the user
//then the checkWon function checks if the value of the cards won is equal to the legnth of the card divided by 2
//then it alerts the user they won

function checkForMatch() {
  let imgs = document.querySelectorAll("img");
  let firstCard = cardsId[0];
  let secondCard = cardsId[1];
  if (cardsSelected[0] === cardsSelected[1] && firstCard !== secondCard) {
    alert("You found a match");

    cardsWon += 1;
    scoreBoard.innerHTML = cardsWon;
    setTimeout(checkWon, 500);
  } else {
    imgs[firstCard].setAttribute("src", "https://i.imgur.com/7rhDR2Q.jpg");
    imgs[secondCard].setAttribute("src", "https://i.imgur.com/7rhDR2Q.jpg");
    alert("wrong, try again");
    imgs[firstCard].classList.remove("flip");
    imgs[secondCard].classList.remove("flip");
  }
  cardsSelected = [];
  cardsId = [];
  clicks += 1;
  clickBoard.innerHTML = clicks;
}

function checkWon() {
  if (cardsWon == cardArray.length / 2) {
    alert("You win!");
    setTimeout(() => (popup.style.display = "flex"), 300);
  }
}
// function to replay game.
//function to alert the player if they want to restart the game.
//rearranges the array again, empties the game board
//resets moves and score.

function replay() {
  arrangeCard();
  grid.innerHTML = "";
  createBoard(grid, cardArray);
  cardsWon = 0;
  clicks = 0;
  clickBoard.innerHTML = 0;
  scoreBoard.innerHTML = 0;
  popup.style.display = "none";
}
