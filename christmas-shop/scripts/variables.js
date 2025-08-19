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
const backToTopButton = document.querySelector('.back--to--top');

let activeTab = 'all';

export {
    resources,
    isGiftsPage,
    body,
    indicatorsArray,
    christmasButton,
    burgerButton,
    menuLinksArea,
    slider,
    carousel,
    sliderButtons,
    giftsSection,
    filterTabs,
    backToTopButton,
    activeTab
};

export function setTab(tab) {
    activeTab = tab;
}
