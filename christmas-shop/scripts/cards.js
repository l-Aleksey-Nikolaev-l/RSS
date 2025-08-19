import {resources, isGiftsPage, giftsSection, activeTab} from './variables.js';

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
        const imagePath = 'pictures/product/';
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
                        <p class="gift__card__goal paragraph-text">${this.description}</p>
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

function shuffleCards(cardsArray) {
    for (let i = cardsArray.length; i-- > 0;) {
        const randomNumber = Math.floor(Math.random() * (i));
        [cardsArray[i], cardsArray[randomNumber]] = [cardsArray[randomNumber], cardsArray[i]];
    }
    return cardsArray;
}

function filterCards(cardsArray) {
    if (isGiftsPage && activeTab !== 'all') {
        cardsArray = cardsArray.filter((item) => item['category'].toLowerCase() === activeTab);
    }
    return cardsArray;
}

function collectCards(cardsArray) {
    let cardCollection = '';
    if (!isGiftsPage) {
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

export default addRandomCards;
