import addRandomCards from './cards.js';
import showTimeToNewYear from './timer.js';
import startListeners from './listeners.js'


addRandomCards();
showTimeToNewYear();
setInterval(showTimeToNewYear, 1000);
