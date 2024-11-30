import addRandomCards from './cards.js';
import showTimeToNewYear from './timer.js';
import startListeners from './listeners.js'


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