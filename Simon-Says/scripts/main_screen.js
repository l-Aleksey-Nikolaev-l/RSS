import {wrapper} from './variables.js';

class MainScreen {

    #buttons = ['Play', 'Settings', 'Rules'];

    #createMainSection() {
        const main = document.createElement('main');
        main.classList.add('main');
        return main;
    }

    #createTopSection() {
        const topSection = document.createElement('section');
        topSection.classList.add('main__section', 'main__top_section');
        const headerText = document.createElement('h1');
        headerText.classList.add('main__header_text');
        headerText.textContent = 'Simon Says Game'
        topSection.append(headerText);
        return topSection;
    }

    #createBottomSection() {
        const bottomSection = document.createElement('section');
        bottomSection.classList.add('main__section', 'main__bottom_section');
        for (const button of this.#buttons) {
            const newButton = this.#createMainButton(button);
            bottomSection.append(newButton);
        }
        return bottomSection;
    }

    #createMainButton(button = '') {
        const mainButton = document.createElement('button');
        mainButton.classList.add('main__button', `main__button_${button.toLowerCase()}`);
        mainButton.textContent = button;
        return mainButton;
    }

    createMainScreen() {
        const mainSection = this.#createMainSection();
        const topSection = this.#createTopSection();
        const bottomSection = this.#createBottomSection();
        mainSection.append(topSection, bottomSection);
        return mainSection;
    }
}

function showMainScreen() {
    const mainScreen = new MainScreen().createMainScreen();
    wrapper[0].append(mainScreen);
}

export default showMainScreen;
