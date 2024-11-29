const resources = fetch('../res/gifts.json').then(res => res.json());
const isGiftsPage = window.location.pathname.includes('/gifts/');

const body = document.querySelector('#top');
const indicatorsArray = document.querySelectorAll('.cta__timer__indicator > h2');
const christmasButton = document.querySelectorAll('.christmas__button');
const burgerButton = document.querySelector('#burger__checkbox');
const menuLinksArea = document.querySelector('.menu__links');
const slider = document.querySelector('.slider__carousel');
const carousel = document.querySelector('.carousel__list');
const sliderButtons = document.querySelectorAll('.slider__button');
const giftsSection = document.querySelector('.gift__cards');
const filterTabs = document.querySelector(".mg--tabs");
const backToTop = document.querySelector('.back--to--top');
let closeModalButton = document.querySelector('.gift__card__close');

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

    #getStar() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const path = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        svg.setAttribute('viewBox', '0 0 20.7 24');
        path.setAttribute('d', 'M17.3,14.8l-.8-.5,2.2-.6-.4-1.4-3.6,1-1.7-1v-.8l1.7-1,3.6,1,' +
            '.4-1.4-2.2-.6.8-.5h3.5l.5-3L18.5,5,16.6,8l-.8.5.6-2.2L15,5.9,14,9.5l' +
            '-1.7,1a1.61,1.61,0,0,0-.7-.4v-2l2.6-2.6-1-1L11.6,6.1v-1L13.3,2,11,0,' +
            '8.7,2l1.6,3.1V6L8.7,4.5l-1,1,2.6,2.6V10a2.51,2.51,0,0,0-.7.4L8,9.4,7,' +
            '5.9l-1.4.3.6,2.2L5.4,8,3.5,5,.7,6l.5,3,3.5.2.8.5-2.2.6.4,1.4,3.6-1,1.7,' +
            '1v.8l-1.7,1-3.6-1-.4,1.4,2.2.6-.8.5H1.2L.7,18l2.8,1,1.9-3,.8-.5-.6,2.2,' +
            '1.4.4,1-3.6,1.7-1a1.61,1.61,0,0,0,.7.4v1.9L7.8,18.4l1,1,1.6-1.6v.9L8.7,' +
            '22,11,24l2.3-2-1.6-3.1V18l1.6,1.6,1-1L11.7,16V14a2.51,2.51,0,0,0,.7-.4' +
            'l1.7,1,1,3.6,1.4-.4-.6-2.2.8.5L18.6,19l2.8-1-.6-3Z');
        path.setAttribute('transform', 'translate(-0.7)');
        svg.appendChild(path);
        svg.setAttribute('fill', 'var(--primary-color-10)');
        return svg;
    }

    #fillStars(score) {
        score = Number(score) / 100;
        let blockOfStars = '';
        const star = this.#getStar();
        for (let i = 0; i < score; i++) {
            const activeStar = star.cloneNode(true);
            activeStar.setAttribute('fill', 'var(--primary-color)');
            blockOfStars += activeStar.outerHTML;
        }
        blockOfStars += star.outerHTML.repeat(5 - score);
        return blockOfStars;
    }

    #createAdds(adds) {
        let newAdds = '';
        for (let [superpower, score] of Object.entries(adds)) {
            newAdds += `<div class="superpowers__add">
                           <p class="add__text paragraph-text">${superpower}</p>
                           <p class="add__score paragraph-text">${score}</p>
                           <div class="add__stars">${this.#fillStars(score)}</div>
                        </div>`;
        }
        return newAdds;
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
            <div class="gift__card__close"></div>
                <div class="gift__card__image">
                  <img src=${imagePath + images[this.category]} alt="Best gift image ${this.category}" width="620" height="460"/>
                </div>
                <div class="gift__card__text">
                  <div class="gift__card__title">
                      <h4 class="header-4 ${categories[this.category]}">${this.category}</h4>
                      <h3 class="gift__card__description header-3">${this.name}</h3>
                      <p class="gift__card__goal paragraph-text">Uses console.log like a crystal ball to find any issue.</p>
                  </div>
                  <div class="gift__card__superpowers">
                    <h4 class="header-4">Adds superpowers to:</h4>
                    <div class="superpowers__adds">
                      ${this.#createAdds(this.superpowers)}
                    </div>
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
    closeModalButton = document.querySelector('.gift__card__close');
    giftsSection.removeEventListener('click', showModal);
    document.querySelector('.overlay').addEventListener('click', removeModal);
    closeModalButton.addEventListener('click', removeModal);
}

function removeModal(event) {
    if (event.target.className === 'overlay' || event.target.className === 'gift__card__close') {
        document.querySelector('.overlay').removeEventListener('click', removeModal);
        closeModalButton.removeEventListener('click', removeModal);
        document.querySelector('.card__selected').remove();
        giftsSection.addEventListener('click', showModal);
        body.classList.toggle('overlay');
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

function closeMobileMenu() {
    if(window.innerWidth > 768) {
        burgerButton.checked = false;
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
    closeMobileMenu();
});

sliderButtons.forEach((button) => {
    button.addEventListener('click', clickSliderButton)
});

filterTabs?.addEventListener('click', switchTab);

giftsSection.addEventListener('click', showModal);

backToTop?.addEventListener('click',() => {
    window.scrollTo(0, 0);
});