const container = document.getElementById("circle-game-container");
let numberOfCircles = 5;
let score = 0;
let elapsed = 0;
let finalTime = 0;
let RealScore = 0;
let play = true;
let namee;
const scoreDisplay = document.getElementById("score");
const add = document.getElementById("add");

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    elapsed = (Date.now() - startTime) / 1000;
  }, 100);
}

function createCircle() {
  const circle = document.createElement("div");
  circle.classList.add("circle");

  const maxX = container.clientWidth - 40; // circle width
  const maxY = container.clientHeight - 40; // circle height

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY); // randomize dat position

  circle.style.left = `${randomX}px`;
  circle.style.top = `${randomY}px`;

  //add.addEventListener("click", numberOfCircles++);
  circle.addEventListener("click", () => {
    container.removeChild(circle);
    const newCircle = createCircle();
    container.appendChild(newCircle);
    score++;

  });

  return circle;
}

function stopTimer() {
  clearInterval(timerInterval);
  finalTime = elapsed.toFixed(3);
  RealScore = score / finalTime;
  scoreDisplay.textContent = `Clicked: ${score} Time: ${elapsed.toFixed(0)}s | Final Score: ${RealScore.toFixed(1)}cps`;
  play = false;
}

function updateTimer() {
  if (play) {
    currentTime = Date.now();
    elapsed = (currentTime - startTime) / 1000; // in seconds
    scoreDisplay.textContent = `Clicked: ${score} Time: ${elapsed.toFixed(3)}s`;
    if (elapsed >= 15) {
      stopTimer();
    }
  }
}


// create the masses 
for (let i = 0; i < numberOfCircles; i++) {
  const circle = createCircle();
  container.appendChild(circle);
}


function checkScore() {
  if (elapsed >= 15) {
    addScore();
  }
}

startTimer();
setInterval(updateTimer, 10); // update every 10ms
