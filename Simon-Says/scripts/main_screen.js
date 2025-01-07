class MainScreen {

    #buttons = ['Play', 'Settings', 'Rules'];

    #mainSection() {
        const main = document.createElement('main');
        main.classList.add('main');
        return main;
    }

    #topSection() {
        const topSection = document.createElement('section');
        topSection.classList.add('main__top_section');
        const headerText = document.createElement('h1');
        headerText.classList.add('main__header_text');
        headerText.textContent = 'Simon Says Game'
        topSection.append(headerText);
        return topSection;
    }

    #bottomSection() {
        const bottomSection = document.createElement('section');
        bottomSection.classList.add('main__bottom_section');
        for (const button of this.#buttons) {
            const newButton = this.#mainButton(button);
            bottomSection.append(newButton);
        }
        return bottomSection;
    }

    #mainButton(button = '') {
        const mainButton = document.createElement('button');
        mainButton.classList.add(`main__button_${button.toLowerCase()}`);
        mainButton.textContent = button;
        return mainButton;
    }
}

function showMainScreen() {
    return 0;
}

export default showMainScreen;
