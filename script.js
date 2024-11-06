let gameContent = document.querySelector(".game-content");
let h1 = document.querySelector("h1");
let h3 = document.querySelector("h3");
let rock = document.querySelector(".rock");
let paper = document.querySelector(".paper");
let scissor = document.querySelector(".scissor");
let win = document.querySelector("#win");
let lost = document.querySelector("#lost");
let draw = document.querySelector("#draw");
let replay = document.querySelector("#replay");
let rightImg = document.querySelector(".right-img");
let leftImg = document.querySelector(".left-img");
let h3display = document.querySelector(".h3display");
let winSound = document.getElementById("win-sound");
let lossSound = document.getElementById("loss-sound");
let drawSound = document.getElementById("draw-sound");
let winCount, lostCount, drawCount;

winCount = 0;
lostCount = 0;
drawCount = 0;

rock.addEventListener("click", () => {
  navigator.vibrate(100);
  playGame("rock");
});
paper.addEventListener("click", () => {
  navigator.vibrate(100);
  playGame("paper");
});
scissor.addEventListener("click", () => {
  navigator.vibrate(100);
  playGame("scissor");
});

function playGame(playerChoice) {
  h3display.style.display = "block";
  h3display.innerText = "";

  gameContent.style.display = "none";
  rightImg.style.display = "flex";
  leftImg.style.display = "flex";

  let computerChoice = Math.floor(Math.random() * 3);
  let choices = ["rock", "paper", "scissor"];
  let computerChoiceName = choices[computerChoice];

  leftImg.src = `/images/${playerChoice}-left.png`;
  rightImg.src = `/images/${computerChoiceName}-right.png`;

  leftImg.style.animation = "left-entry 1s forwards, head-turn 1s forwards 2s";
  rightImg.style.animation =
    "right-entry 1s forwards, head-turn 1s forwards 2s";

  setTimeout(() => {
    
    if (playerChoice === computerChoiceName) {
      h3.innerText = "Draw!";
      rightImg.style.display = "none";
      leftImg.style.display = "none";
      drawCount++;
      draw.innerText = drawCount;
      drawSound.play();
    } else if (
      (playerChoice === "rock" && computerChoiceName === "scissor") ||
      (playerChoice === "paper" && computerChoiceName === "rock") ||
      (playerChoice === "scissor" && computerChoiceName === "paper")
    ) {
      h3.innerText = "You Won!";
      winCount++;
      win.innerText = winCount;
      rightImg.style.display = "none";
      leftImg.style.display = "none";
      winSound.play();
      createStars();
    } else {
      h3.innerText = "You Lost!";
      lostCount++;
      lost.innerText = lostCount;
      rightImg.style.display = "none";
      leftImg.style.display = "none";
      lossSound.play();
    }
    replay.style.display = "block";
  }, 1500);
  h3display.style.display = "flex";
  h3display.style.justifyContent = "center";
  h3display.style.alignItems = "center";
  h3display.style.height = "100vh";
  h3display.style.margin = "0";
}

function createStars() {
  for (let i = 0; i < 40; i++) {
    let star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 2 + 3}s`;
    star.style.animationDelay = `${Math.random() * 2}s`;
    document.getElementById("stars-container").appendChild(star);
  }
}

function clearStars() {
  const starsContainer = document.getElementById("stars-container");
  while (starsContainer.firstChild) {
    starsContainer.removeChild(starsContainer.firstChild);
  }
}

replay.addEventListener("click", () => {
  gameContent.style.display = "flex";
  gameContent.style.flexDirection = "column";
  gameContent.style.justifyContent = "center";
  gameContent.style.alignItems = "center";
  gameContent.style.height = "100vh";

  rightImg.style.display = "none";
  leftImg.style.display = "none";
  replay.style.display = "none";
  h3display.style.display = "none";
  clearStars();
});
