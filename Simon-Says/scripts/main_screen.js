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
}

function showMainScreen() {
    return 0;
}

export default showMainScreen;
