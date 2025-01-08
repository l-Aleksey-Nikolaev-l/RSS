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

function showSettings() {
    console.log('Snow Settings');
}

export default showSettings;
