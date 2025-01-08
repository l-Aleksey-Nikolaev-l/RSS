import {wrapper, difficulty} from "./variables";

class PlayScreen {

    constructor(difficulty) {
        this.difficulty = difficulty;
    }

    #createMainSection() {
        const main = document.createElement('main');
        main.classList.add('main', 'main__play_section');
        return main;
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
