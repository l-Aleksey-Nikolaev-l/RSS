import {wrapper} from './variables.js';

class MainScreen {

    #buttons = ['Play', 'Settings', 'Rules'];

    #mainSection() {
        const main = document.createElement('main');
        main.classList.add('main');
        return main;
    }

    #topSection() {
        const topSection = document.createElement('section');
        topSection.classList.add('main__section', 'main__top_section');
        const headerText = document.createElement('h1');
        headerText.classList.add('main__header_text');
        headerText.textContent = 'Simon Says Game'
        topSection.append(headerText);
        return topSection;
    }

    #bottomSection() {
        const bottomSection = document.createElement('section');
        bottomSection.classList.add('main__section', 'main__bottom_section');
        for (const button of this.#buttons) {
            const newButton = this.#mainButton(button);
            bottomSection.append(newButton);
        }
        return bottomSection;
    }

    #mainButton(button = '') {
        const mainButton = document.createElement('button');
        mainButton.classList.add('main__button', `main__button_${button.toLowerCase()}`);
        mainButton.textContent = button;
        return mainButton;
    }

    show() {
        const main = this.#mainSection();
        const topSection = this.#topSection();
        const bottomSection = this.#bottomSection();
        main.append(topSection, bottomSection);
        return main;
    }
}

function showMainScreen() {
    const mainScreen = new MainScreen().show();
    wrapper[0].append(mainScreen);
}

export default showMainScreen;
