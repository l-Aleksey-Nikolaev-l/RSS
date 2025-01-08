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
    #createDifficultySetting() {
        const settingList = document.createElement('select');
        settingList.classList.add('difficulty__list');
        settingList.id = 'difficulty__list';

        for (const option in difficultySettings) {
            const description = difficultySettings[option];
            const difficultyOption = document.createElement('option');
            difficultyOption.classList.add('difficulty__option')
            difficultyOption.setAttribute('value', option);
            difficultyOption.textContent = option + ': ' + description;
            settingList.append(difficultyOption);
        }
        return settingList
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
