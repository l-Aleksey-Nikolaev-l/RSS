const resources = fetch('./res/gifts.json').then(res => res.json());
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
    setTimeout(() => {
        selectedCard.style.opacity = '1';
    },0);
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
    burgerButton.checked = false;
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
});