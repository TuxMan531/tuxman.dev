document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("circle-game-container");
    let numberOfCircles = 5;
    let score = 0;
    let elapsed = 0;
    let finalTime = 0;
    let Iknowthisisbad = 0;
    let play = true;
    const scoreDisplay = document.getElementById("score");
    const add = document.getElementById("add");
  
    if (!container) { // idk why this would happen but who knows
      console.error("Circle game container not found.");
      return;
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
          elapsed = (Date.now() - startTime) / 1000;
      }, 100);
      }

    function createCircle() {
      const circle = document.createElement("div");
      circle.classList.add("circle");
  
      const maxX = container.clientWidth - 20; // circle width
      const maxY = container.clientHeight - 20; // circle height
  
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
        Iknowthisisbad = score / finalTime;
        scoreDisplay.textContent = `Clicked: ${score} Time: ${elapsed.toFixed(3)}s | Final Score: ${Iknowthisisbad.toFixed(1)}cps`;
        play = false;
    }

    function updateTimer() { if (play) {
        currentTime = Date.now();
        elapsed = (currentTime - startTime) / 1000; // in seconds
        scoreDisplay.textContent = `Score: ${score} Time: ${elapsed.toFixed(3)}s`;
        if (elapsed >= 15) {
            stopTimer();
        }
    }}

    
    // create the masses 
    for (let i = 0; i < numberOfCircles; i++) {
      const circle = createCircle();
      container.appendChild(circle);
    }


    startTimer();
    setInterval(updateTimer, 10); // update every 10ms
  });