import {isGiftsPage, carousel, slider, sliderButtons} from './variables.js'

let carouselPosition = 0;

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
        if (Math.abs(carouselPosition) >= carouselTail - tolerance) {
            button.currentTarget.classList.toggle('slider__button__disabled');
        }
    } else {
        sliderButtons[1].classList.remove('slider__button__disabled');
        carouselPosition += carouselDividedTail;
        if (Math.abs(carouselPosition) <= 0) {
            button.currentTarget.classList.toggle('slider__button__disabled');
        }
    }
    carousel.style.left = carouselPosition + 'px';
}

export {clickSliderButton, resetSlider}
