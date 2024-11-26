let indicatorsArray = document.querySelectorAll(".cta__timer__indicator > h2");

function getTimeToNewYear() {
    const currentYear = new Date().getUTCFullYear();
    const currentUTCDate = Date.parse(new Date().toUTCString());
    const expireDate = Date.parse(`December 31, ${currentYear} 23:59:59 GMT-00:00`);
    let secondsLeft = Math.floor((expireDate - currentUTCDate) / 1000);

    let daysLeft = Math.floor(secondsLeft / (24 * 3600));
    secondsLeft -= daysLeft * 24 * 3600;
    let hoursLeft = Math.floor(secondsLeft / 3600);
    secondsLeft -= hoursLeft * 3600;
    let minutesLeft = Math.floor(secondsLeft / 60);
    secondsLeft -= minutesLeft * 60;

    return {
        days: String(daysLeft),
        hours: String(hoursLeft),
        minutes: String(minutesLeft),
        seconds: String(secondsLeft)
    };
}

function showTimeToNewYear() {
    const timeLeft = getTimeToNewYear();
    Object.values(timeLeft).map((item, index) => {
        indicatorsArray[index].textContent = item;
    });
}

showTimeToNewYear();

setInterval(showTimeToNewYear, 1000);
