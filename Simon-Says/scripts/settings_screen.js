class Settings {

}
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

function showSettings() {
    console.log('Snow Settings');
}

export default showSettings;
