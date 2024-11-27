const resources = fetch('../res/gifts.json').then(res => res.json());
const isGiftsPage = window.location.pathname.includes('/gifts/');

const indicatorsArray = document.querySelectorAll('.cta__timer__indicator > h2');
const christmasButton = document.querySelectorAll('.christmas__button');
const menuLinksArea = document.querySelector('.menu__links');
const slider = document.querySelector('.slider__carousel');
const carousel = document.querySelector('.carousel__list');
const sliderButtons = document.querySelectorAll('.slider__button');

let viewportWidth = 0;
let sliderWidth = 0;
let carouselWidth = 0;
let carouselPosition = 0;

christmasButton.forEach(function(button) {
    button.addEventListener('click', () => {
        location.href = './gifts';
    })
});

menuLinksArea.addEventListener('click', () => {
    document.getElementById('burger__checkbox').checked = false;
})

window.addEventListener('resize', () => {
    carouselPosition = 0;
    carousel.style.left = carouselPosition;
    sliderButtons[0].classList.add('slider__button__disabled');
    sliderButtons[1].classList.remove('slider__button__disabled');
})

sliderButtons.forEach((button) => {
    button.addEventListener('click', () => {
        viewportWidth = window.innerWidth;
        sliderWidth = slider.offsetWidth;
        carouselWidth = carousel.offsetWidth;
        const carouselDivider = viewportWidth <= 768 ? 6 : 3;
        const carouselTail = carouselWidth - sliderWidth;
        const carouselDividedTail = Math.round(carouselTail / carouselDivider);
        const tolerance = 3;
        if (button.classList.contains('slider__button__next')) {
            sliderButtons[0].classList.remove('slider__button__disabled');
            carouselPosition -= carouselDividedTail;
            if(Math.abs(carouselPosition) >= carouselTail - tolerance) {
                button.classList.add('slider__button__disabled');
            }
        } else {
            sliderButtons[1].classList.remove('slider__button__disabled');
            carouselPosition += carouselDividedTail;
            if(Math.abs(carouselPosition) <= 0) {
                button.classList.add('slider__button__disabled');
            }
        }
        carousel.style.left = carouselPosition + 'px';
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






resources.then(cardsArray => {
    cardsArray = shuffleCards(cardsArray);
    if(!isGiftsPage) {
        for (let i = 0; i < 4; i++) {
            insertCard(cardsArray[i]);
        }
    } else {
        cardsArray.forEach((card) => {
            insertCard(card);
        })
    }
});

function shuffleCards(cardsArray) {
    for (let i = cardsArray.length; i >= 0 ; i--) {
        const randomNumber = Math.floor(Math.random() * (i));
        [cardsArray[i], cardsArray[randomNumber]] = [cardsArray[randomNumber], cardsArray[i]];
    }
    return cardsArray;
}

function insertCard(card) {
    const imagePath = isGiftsPage ? "../pictures/product/" : "pictures/product/";
    const images = {
        "For Work": "gift-for-work.png",
        "For Health": "gift-for-health.png",
        "For Harmony": "gift-for-harmony.png",
    }
    const categories = {
        "For Work": "tag--work",
        "For Health": "tag--health",
        "For Harmony": "tag--harmony",
    }
    const cardTemplate = `
                        <div class="gift__card">
                            <div class="gift__card__image">
                                <img src=${imagePath + images[card['category']]} alt="Best gift image" width="620" height="460"/>
                            </div>
                            <div class="gift__card__text">
                                <h4 class="header-4 ${categories[card['category']]}">${card['category']}</h4>
                                <h3 class="gift__card__description header-3">${card['name']}</h3>
                            </div>
                        </div>`
    document.querySelector('.gift__cards').insertAdjacentHTML("beforeend", cardTemplate);
}



