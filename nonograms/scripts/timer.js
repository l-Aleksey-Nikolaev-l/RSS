let timer = null;
let isStarted = false;

function startTimer() {
  if (isStarted) {
    return;
  }
  isStarted = true;
  timer = setInterval(showTime, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  isStarted = false;
}

function showTime() {
}

export {
  startTimer,
  stopTimer,
  resetTimer
};