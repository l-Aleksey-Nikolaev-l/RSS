const resources = fetch('../res/gifts.json').then(res => res.json());
const isGiftsPage = window.location.pathname.includes('/gifts/');

const body = document.querySelector('#top');
const indicatorsArray = document.querySelectorAll('.cta__timer__indicator > h2');
const christmasButton = document.querySelectorAll('.christmas__button');
const menuLinksArea = document.querySelector('.menu__links');
const slider = document.querySelector('.slider__carousel');
const carousel = document.querySelector('.carousel__list');
const sliderButtons = document.querySelectorAll('.slider__button');
const giftsSection = document.querySelector('.gift__cards');
const filterTabs = document.querySelector(".mg--tabs");
const backToTop = document.querySelector('.back--to--top');

let carouselPosition = 0;

let activeTab = 'all';

class Card {
    constructor(id, {name, description, category, superpowers}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.superpowers = superpowers;
    }

    get createCard() {
        const imagePath = isGiftsPage ? '../pictures/product/' : 'pictures/product/';
        const images = {
            'For Work': 'gift-for-work.png',
            'For Health': 'gift-for-health.png',
            'For Harmony': 'gift-for-harmony.png',
        }
        const categories = {
            'For Work': 'tag--work',
            'For Health': 'tag--health',
            'For Harmony': 'tag--harmony',
        }
        return `
            <div class="gift__card" data-id=${this.id}>
                <div class="gift__card__image">
                  <img src=${imagePath + images[this.category]} alt="Best gift image ${this.category}" width="620" height="460"/>
                </div>
                <div class="gift__card__text">
                  
                  <div class="gift__card__title">
                      <h4 class="header-4 ${categories[this.category]}">${this.category}</h4>
                      <h3 class="gift__card__description header-3">${this.name}</h3>
                  </div>
                  
                </div>
            </div>`;
    }
}

function resetSlider() {
    if (!isGiftsPage) {
        carouselPosition = 0;
        carousel.style.left = carouselPosition;
        sliderButtons[0].classList.add('slider__button__disabled');
        sliderButtons[1].classList.remove('slider__button__disabled');
    }
}

function clickSliderButton(button) {
    const carouselDivider = window.innerWidth <= 768 ? 6 : 3;
    const carouselTail = carousel.offsetWidth - slider.offsetWidth;
    const carouselDividedTail = Math.round(carouselTail / carouselDivider);
    const tolerance = 3;
    const direction = button.currentTarget.dataset.direction;
    if (direction === 'next') {
        sliderButtons[0].classList.remove('slider__button__disabled');
        carouselPosition -= carouselDividedTail;
        if(Math.abs(carouselPosition) >= carouselTail - tolerance) {
            button.currentTarget.classList.toggle('slider__button__disabled');
        }
    } else {
        sliderButtons[1].classList.remove('slider__button__disabled');
        carouselPosition += carouselDividedTail;
        if(Math.abs(carouselPosition) <= 0) {
            button.currentTarget.classList.toggle('slider__button__disabled');
        }
    }
    carousel.style.left = carouselPosition + 'px';
}

function switchTab(event) {
    if(!event.target.childElementCount) {
        for (let i = 0; i < filterTabs.childElementCount; i++) {
            const childClasses = filterTabs.children[i].classList;
            if (!childClasses.contains('mg--tabs__selected')) {
                continue;
            }
            childClasses.remove('mg--tabs__selected');
            break;
        }
        event.target.classList.add('mg--tabs__selected');
        activeTab = event.target.textContent.toLowerCase();
        addRandomCards(false);
    }
}

function showModal(event) {
    const cardId = Number(event.target.dataset.id);
    if(body.classList.contains('overlay') || isNaN(cardId)) return;
    body.classList.toggle('overlay');
    const topPosition = (giftsSection.getBoundingClientRect().top * -1).toString() + 'px';
    const selectedCard = document.querySelector(`[data-id='${cardId}']`).cloneNode(true);
    selectedCard.style.top = `calc(${topPosition} + var(--height-center))`;
    selectedCard.classList.add('card__selected');
    giftsSection.insertAdjacentElement('afterbegin', selectedCard);
}

function removeModal(event) {
    if (event.target.className === 'overlay') {
        body.classList.toggle('overlay');
        document.querySelector('.card__selected').remove();
    }
}

function defineScrollPosition() {
    if(!isGiftsPage) return;
    if(window.innerWidth <= 768 && window.scrollY >= 300) {
        backToTop.style.opacity = "1";
        backToTop.style.transform = "scale(1)";
    } else {
        backToTop.style.opacity = "0";
        backToTop.style.transform = "scale(0)";
    }
}

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
    if (isGiftsPage) return;
    const timeLeft = getTimeToNewYear();
    Object.values(timeLeft).map((item, index) => {
        indicatorsArray[index].textContent = item;
    });
}

function shuffleCards(cardsArray) {
    for (let i = cardsArray.length; i-- > 0;) {
        const randomNumber = Math.floor(Math.random() * (i));
        [cardsArray[i], cardsArray[randomNumber]] = [cardsArray[randomNumber], cardsArray[i]];
    }
    return cardsArray;
}

function filterCards(cardsArray) {
    if(isGiftsPage && activeTab !== 'all') {
        cardsArray = cardsArray.filter((item) => item['category'].toLowerCase() === activeTab);
    }
    return cardsArray;
}

function collectCards(cardsArray) {
    let cardCollection = '';
    if(!isGiftsPage) {
        for (let i = 0; i < 4; i++) {
            cardCollection += new Card(i, cardsArray[i]).createCard;
        }
    } else {
        cardsArray.forEach((card, index) => {
            cardCollection += new Card(index, card).createCard;
        })
    }
    return cardCollection;
}

function addRandomCards(shuffle = true) {
    resources.then(cardsArray => {
        cardsArray = shuffle ? shuffleCards(cardsArray) : cardsArray;
        cardsArray = filterCards(cardsArray)
        giftsSection.innerHTML = collectCards(cardsArray);
    });
}

addRandomCards();
showTimeToNewYear();
setInterval(showTimeToNewYear, 1000);

christmasButton.forEach((button) => {
    button.addEventListener('click', () => {
        location.href = './gifts';
    })
});

window.addEventListener('scroll', defineScrollPosition);

menuLinksArea.addEventListener('click', () => {
    document.getElementById('burger__checkbox').checked = false;
})

window.addEventListener('resize', () => {
    resetSlider();
    defineScrollPosition();
});

sliderButtons.forEach((button) => {
    button.addEventListener('click', clickSliderButton)
});

filterTabs?.addEventListener('click', switchTab);

giftsSection.addEventListener('click', showModal);

document.body.addEventListener('click', removeModal);

backToTop?.addEventListener('click',() => {
    window.scrollTo(0, 0);
});