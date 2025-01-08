import {wrapper} from './variables.js';

const difficultySettings = {
    'easy': 'only numbers (0-9)',
    'medium': 'only letters (A-Z)',
    'hard': 'easy + medium'
};

class Settings {

    #createMainSection() {
        const main = document.createElement('main');
        main.classList.add('main', 'main__settings_section');
        return main;
    }

    #createSettingsList() {
        return '';
    }

    #createBackButton() {
        const backButton = document.createElement('button');
        backButton.classList.add('main__button', 'back__button');
        backButton.textContent = 'Back';
        return backButton;
    }

    createSettings() {
        const mainSection = this.#createMainSection();
        const settingsSection = this.#createSettingsList();
        const backButton = this.#createBackButton();
        mainSection.append(settingsSection, backButton);
        return mainSection;
    }
}


function showSettings() {
    const settingsScreen = new Settings().createSettings();
    wrapper[0].append(settingsScreen);
}

export default showSettings;
