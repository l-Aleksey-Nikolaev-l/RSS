import switchTab from './switch-gifts-tabs.js';
import showModal from './modal.js';
import {clickSliderButton, resetSlider} from './slider.js'
import closeMobileMenu from './mobile-menu.js'
import {defineScrollPosition, backToTop} from './scroll.js'

import {
    christmasButton,
    menuLinksArea,
    burgerButton,
    sliderButtons,
    filterTabs,
    giftsSection,
    backToTopButton
} from './variables.js'

function startListeners() {
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
    backToTopButton?.addEventListener('click', backToTop);
}

export default startListeners;
