import {isGiftsPage, backToTopButton} from './variables.js'

function defineScrollPosition() {
    if(!isGiftsPage) return;
    if(window.innerWidth <= 768 && window.scrollY >= 300) {
        backToTopButton.style.opacity = "1";
        backToTopButton.style.transform = "scale(1)";
    } else {
        backToTopButton.style.opacity = "0";
        backToTopButton.style.transform = "scale(0)";
    }
}

function backToTop() {
    window.scrollTo(0, 0);
}

export {defineScrollPosition, backToTop};
