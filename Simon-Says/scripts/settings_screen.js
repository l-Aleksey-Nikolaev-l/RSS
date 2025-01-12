import {
    wrapper,
    difficulty,
    difficultySettings,
    backgroundVolume,
    effectsVolume,
    timeForShowing,
    timeBetweenShows, isPlayMusic
} from './variables.js';

class Settings {

    #createMainSection() {
        const main = document.createElement('main');
        main.classList.add('main', 'main__settings_section');
        return main;
    }

    #createSettingsList() {
        const settingsList = document.createElement('div');
        settingsList.classList.add('settings__list')
        const difficultySettingContainer = this.#createSettingContainer();
        const audionSettingContainer = this.#createAudioSettings();
        const timingSettingContainer = this.#createTimingSettings();
        const answerSettingContainer = this.#createShowAnswerSetting();
        const difficultyLabel = this.#createSettingLabel('difficulty__list', 'Difficulty level is');
        const difficultySetting = this.#createDifficultySetting();
        difficultySetting.value = difficulty;
        difficultySettingContainer.append(difficultyLabel, difficultySetting);
        settingsList.append(
            difficultySettingContainer,
            audionSettingContainer,
            timingSettingContainer,
            answerSettingContainer);
        return settingsList;
    }

    #createSettingContainer() {
        const settingContainer = document.createElement('div');
        settingContainer.classList.add('setting__container');
        return settingContainer;
    }

    #createSettingLabel(labelFor = '', labelText = '') {
        const settingLabel = document.createElement('label');
        settingLabel.classList.add('setting__label');
        settingLabel.setAttribute('for', labelFor);
        settingLabel.textContent = labelText;
        return settingLabel;
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

    #createAudioSettings() {
        const audioSettingsList = document.createElement('div');
        audioSettingsList.classList.add('settings__container_audio')

        const musicPlayContainer = this.#createSettingContainer();
        const musicPlayLabel = this.#createSettingLabel('music__play', 'Play background music');
        const musicPlayCheckbox = document.createElement('input');
        musicPlayCheckbox.type = 'checkbox';
        musicPlayCheckbox.id = 'music__play';
        musicPlayCheckbox.name = 'music__play';
        musicPlayCheckbox.checked = isPlayMusic;

        const musicSetting = this.#createRangeElement('Background music volume', 'audio', 0, 1, 0.1, backgroundVolume);
        const effectsSetting = this.#createRangeElement('Effects volume', 'effect', 0, 1, 0.1, effectsVolume);

        musicPlayContainer.append(musicPlayLabel, musicPlayCheckbox);
        audioSettingsList.append(musicPlayContainer, musicSetting, effectsSetting);
        return audioSettingsList;
    }

    #createTimingSettings() {
        const timingSettingsList = document.createElement('div');
        timingSettingsList.classList.add('settings__container_timing')
        const showSetting = this.#createRangeElement('Time to show key', 'show', 300, 1000, 100, timeForShowing);
        const hideSetting = this.#createRangeElement('Time between shows', 'hide', 300, 1000, 100, timeBetweenShows);
        timingSettingsList.append(showSetting, hideSetting);
        return timingSettingsList;
    }

    #createRangeElement(labelText, rangeName, min, max, step, value) {
        const rangeSettingContainer = this.#createSettingContainer();
        const rangeSettingLabel = this.#createSettingLabel(`${rangeName}__setting`, labelText);
        const rangeSetting = document.createElement('input');
        rangeSetting.type = 'range';
        rangeSetting.id = `${rangeName}__setting`;
        rangeSetting.name = `${rangeName}__setting`;
        rangeSetting.min = min;
        rangeSetting.max = max;
        rangeSetting.step = step;
        rangeSetting.value = value;
        rangeSettingContainer.append(rangeSettingLabel, rangeSetting);
        return rangeSettingContainer;
    }

    #createShowAnswerSetting() {
        const showAnswerContainer = this.#createSettingContainer();
        const answerLabel = this.#createSettingLabel('answer__setting', 'Show answers in console');
        const answerCheckbox = document.createElement('input');
        answerCheckbox.type = 'checkbox';
        answerCheckbox.id = 'answer__setting';
        answerCheckbox.name = 'answer__setting';
        answerCheckbox.checked = isPlayMusic;
        showAnswerContainer.append(answerLabel, answerCheckbox);
        return showAnswerContainer;
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
