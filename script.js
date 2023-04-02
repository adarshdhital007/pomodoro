const sessionTimeInput = document.getElementById("session-time");
const breakTimeInput = document.getElementById("break-time");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const pauseButton = document.getElementById("pause-button");
const timeDisplay = document.getElementById("time-display");
const statusDisplay = document.getElementById("status-display");

let intervalId;
let sessionTime;
let breakTime;
let currentTime;
let isSession = true;
let isRunning = false;

function updateDisplay() {
  let minutes = Math.floor(currentTime / 60);
  let seconds = currentTime % 60;
  timeDisplay.innerText = `${minutes < 10 ? "0" + minutes : minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
  statusDisplay.innerText = isSession ? "Session" : "Break";
}

function startTimer() {
  isRunning = true;
  intervalId = setInterval(() => {
    currentTime--;
    if (currentTime <= 0) {
      clearInterval(intervalId);
      if (isSession) {
        isSession = false;
        currentTime = breakTime * 60;
        statusDisplay.className = "warning";
        statusDisplay.innerText = "Break!";
      } else {
        isSession = true;
        currentTime = sessionTime * 60;
        statusDisplay.className = "status";
        statusDisplay.innerText = "Session";
      }
      updateDisplay();
      startTimer();
    } else {
      updateDisplay();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  isRunning = false;
}

function pauseTimer() {
  clearInterval(intervalId);
  isRunning = false;
}

function startButtonClickHandler() {
  if (!isRunning) {
    sessionTime = parseInt(sessionTimeInput.value);
    breakTime = parseInt(breakTimeInput.value);
    if (sessionTime <= 0 || breakTime <= 0) {
      alert("Session time and break time must be greater than zero.");
      return;
    }
    if (currentTime > 0) {
      startTimer();
    } else {
      currentTime = sessionTime * 60;
      updateDisplay();
      startTimer();
    }
  }
}

function stopButtonClickHandler() {
  if (isRunning) {
    stopTimer();
    // Do not reset current time if timer is paused
    if (!isSession) {
      currentTime = breakTime * 60;
    } else {
      currentTime = sessionTime * 60;
    }
    updateDisplay();
  }
}

function pauseButtonClickHandler() {
  if (isRunning) {
    pauseTimer();
  }
}

startButton.addEventListener("click", startButtonClickHandler);
stopButton.addEventListener("click", stopButtonClickHandler);
pauseButton.addEventListener("click", pauseButtonClickHandler);
