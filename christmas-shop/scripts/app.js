const indicatorsArray = document.querySelectorAll(".cta__timer__indicator > h2");
const christmasButton = document.querySelectorAll(".christmas__button");

christmasButton.forEach(function(button) {
    button.addEventListener('click', () => {
        location.href='./gifts';
    })
});

indicatorsArray.length !== 0 && showTimeToNewYear();

function getSecondsToNewYear() {
    const currentYear = new Date().getUTCFullYear();
    const currentUTCDate = Date.parse(new Date().toUTCString());
    const expireDate = Date.parse(`December 31, ${currentYear} 23:59:59 GMT-00:00`);
    return Math.floor((expireDate - currentUTCDate) / 1000);
}

function convertSecondsToTime(seconds) {
    let daysLeft = Math.floor(seconds / (24 * 3600));
    seconds -= daysLeft * 24 * 3600;
    let hoursLeft = Math.floor(seconds / 3600);
    seconds -= hoursLeft * 3600;
    let minutesLeft = Math.floor(seconds / 60);
    seconds -= minutesLeft * 60;
    return {
        days: String(daysLeft),
        hours: String(hoursLeft),
        minutes: String(minutesLeft),
        seconds: String(seconds)
    };
}

function getTimeToNewYear() {
    const secondsLeft = getSecondsToNewYear();
    return convertSecondsToTime(secondsLeft);
}

function showTimeToNewYear() {
    const timeLeft = getTimeToNewYear();
    Object.values(timeLeft).map((item, index) => {
        indicatorsArray[index].textContent = item;
    });
    setInterval(showTimeToNewYear, 1000);
}
