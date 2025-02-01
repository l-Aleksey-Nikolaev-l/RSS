import { setWinnerTime } from './variables.js';

const indicatorsArray = document.getElementsByClassName('puzzle__spend_time');

let timer = null;
let isStarted = false;
let startTime = 0;
let currentTime = 0;

function startTimer() {
  if (isStarted) {
    return;
  }
  isStarted = true;
  startTime = new Date().getTime();
  timer = setInterval(showTime, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer(isResetTime) {
  isStarted = false;
  clearInterval(timer);
  if (isResetTime) {
    setWinnerTime(0);
  }
}

function showTime() {
  indicatorsArray[0].textContent = calculateTime();
}

function calculateTime() {
  currentTime = new Date().getTime();
  let secondsLeft = (currentTime - startTime) * 0.001;
  secondsLeft = Math.floor(secondsLeft);
  setWinnerTime(secondsLeft);
  return convertSecondsToTime(secondsLeft);
}

function convertSecondsToTime(seconds) {
  let min = (seconds - ( seconds %= 60)) / 60;
  min = (min < 10 ? '0' : '') + min;
  const sec = ( seconds < 10 ? ':0' : ':') + seconds;
  return min + sec;
}

export {
  startTimer,
  stopTimer,
  resetTimer,
  convertSecondsToTime
};
