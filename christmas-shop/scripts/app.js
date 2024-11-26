const indicatorsArray = document.querySelectorAll('.cta__timer__indicator > h2');
const christmasButton = document.querySelectorAll('.christmas__button');
const menuLinksArea = document.querySelector('.menu__links');
const slider = document.querySelector('.slider__carousel');
const carousel = document.querySelector('.carousel__list');
const sliderButtons = document.querySelectorAll('.slider__button');

christmasButton.forEach(function(button) {
    button.addEventListener('click', () => {
        location.href='./gifts';
    })
});

menuLinksArea.addEventListener('click', () => {
    document.getElementById('burger__checkbox').checked = false;
})

sliderButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const sliderWidth = slider.offsetWidth;
        const carouselWidth = carousel.offsetWidth;

        const carouselProps = getComputedStyle(carousel);

        let currentCarouselPosition = Number(carouselProps.left.slice(0, -2));
        const carouselVisibleArea = (carouselWidth - sliderWidth) / 3;

        console.log(currentCarouselPosition)

        if(button.classList.contains('slider__button__next')) {
            currentCarouselPosition -= carouselVisibleArea;
        }
        else {
            currentCarouselPosition += carouselVisibleArea;
        }
        carousel.style.left = currentCarouselPosition.toFixed(2) + 'px';
    })
});



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
    if (indicatorsArray.length === 0) return 0;
    const timeLeft = getTimeToNewYear();
    Object.values(timeLeft).map((item, index) => {
        indicatorsArray[index].textContent = item;
    });
}

showTimeToNewYear();
setInterval(showTimeToNewYear, 1000);