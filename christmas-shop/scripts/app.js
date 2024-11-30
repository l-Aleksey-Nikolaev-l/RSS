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