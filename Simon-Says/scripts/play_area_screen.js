import {wrapper, difficulty} from './variables.js';

class PlayScreen {

    constructor(difficulty) {
        this.difficulty = difficulty;
    }

    #createMainSection() {
        const main = document.createElement('main');
        main.classList.add('main', 'main__play_section');
        return main;
    }

    #createTopSection() {
        const topSection = document.createElement('section');
        const attemptSection = document.createElement('div');
        const roundSection = document.createElement('div');
        const attemptText = document.createElement('p');
        const attemptNumber = document.createElement('p');
        const roundText = document.createElement('p');
        const roundNumber = document.createElement('p');

        topSection.classList.add('top__play_section');
        attemptSection.classList.add('top__indicator', 'play__attempt');
        roundSection.classList.add('top__indicator', 'play__round');
        attemptText.classList.add('attempt__text');
        attemptText.textContent = 'Attempt left:';
        attemptNumber.classList.add('attempt__number');
        attemptNumber.textContent = '1';
        roundText.classList.add('round__text');
        roundText.textContent = 'Round:';
        roundNumber.classList.add('round__number');
        roundNumber.textContent = '1/5';

        attemptSection.append(attemptText, attemptNumber);
        roundSection.append(roundText, roundNumber);
        topSection.append(attemptSection, roundSection);
        return topSection;
    }

    #createControlButton(button = '') {
        const controlButton = document.createElement('button');
        controlButton.classList.add('main__button', `control__button_${button.toLowerCase()}`);
        controlButton.textContent = button;
        return controlButton;
    }

    createPlayScreen() {
        const mainSection = this.#createMainSection();
        const backButton = this.#createControlButton('Back');
        backButton.classList.add('back__button');
        mainSection.append(backButton);
        return mainSection;
    }
}

function showPlayArea() {
    const playScreen = new PlayScreen(difficulty).createPlayScreen();
    wrapper[0].append(playScreen);
    console.log(`Play The Game on ${difficulty} level`);
}

export default showPlayArea;
