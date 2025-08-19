import {body, giftsSection} from './variables.js'

let closeModalButton = document.querySelector('.gift__card__close');

function showModal(event) {
    const cardId = Number(event.target.dataset.id);
    if (body.classList.contains('overlay') || isNaN(cardId)) return;
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
    }, 0);
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

export default showModal;
