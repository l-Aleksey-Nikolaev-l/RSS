import { setWinnerTime, winnerTime } from './variables.js';
import { saveBestTime } from './helpers/manage_best_time.js';

const indicatorsArray = document.getElementsByClassName('puzzle__spend_time');

let timer = null;
let isStarted = false;
let startTime = 0;
let currentTime = 0;
let prevTime = 0;

function startTimer() {
  if (isStarted) {
    return;
  }
  isStarted = true;
  prevTime = winnerTime;
  startTime = new Date().getTime();
  timer = setInterval(showTime, 1000);
}

function stopTimer(isWinner) {
  clearInterval(timer);
  if (isWinner) {
    saveBestTime(winnerTime);
  }
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
  secondsLeft += prevTime;
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
