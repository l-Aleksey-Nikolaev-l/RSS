import {wrapper, difficulty} from './variables.js';

class PlayScreen {

    constructor(difficulty) {
        this.difficulty = difficulty;
    }

    #createMainSection() {
        const main = document.createElement('main');
        main.classList.add('main', 'main__play_section');
        return main;
    }

    #createTopSection() {
        const topSection = document.createElement('section');
        const difficultySection = document.createElement('div');
        const attemptSection = document.createElement('div');
        const roundSection = document.createElement('div');
        const difficultyText = document.createElement('p');
        const attemptText = document.createElement('p');
        const difficultyLevel = document.createElement('p');
        const attemptNumber = document.createElement('p');
        const roundText = document.createElement('p');
        const roundNumber = document.createElement('p');

        topSection.classList.add('top__play_section');
        difficultySection.classList.add('top__indicator', 'play__level');
        attemptSection.classList.add('top__indicator', 'play__attempt');
        roundSection.classList.add('top__indicator', 'play__round');
        difficultyText.classList.add('attempt__text');
        difficultyText.textContent = 'Level:';
        attemptText.classList.add('attempt__text');
        attemptText.textContent = 'Attempt left:';
        difficultyLevel.classList.add('difficulty__level');
        difficultyLevel.textContent = this.difficulty;
        attemptNumber.classList.add('attempt__number');
        attemptNumber.textContent = '1';
        roundText.classList.add('round__text');
        roundText.textContent = 'Round:';
        roundNumber.classList.add('round__number');
        roundNumber.textContent = '1/5';

        difficultySection.append(difficultyText, difficultyLevel);
        attemptSection.append(attemptText, attemptNumber);
        roundSection.append(roundText, roundNumber);
        topSection.append(attemptSection, difficultySection, roundSection);
        return topSection;
    }

    #createMiddleSection() {
        const middleSection = document.createElement('section');
        const keyBoard = document.createElement('div');

        middleSection.classList.add('middle__play_section');
        keyBoard.classList.add('keyboard', `keyboard__${this.difficulty}`);
        keyBoard.id = 'keyboard';

        const numeric = [48, 57]; // from 0 to 9
        const letters = [65, 90]; // from A to Z
        let keysArray = [];

        if (difficulty === 'easy') {
            keysArray.push(numeric);
        } else if (difficulty === 'medium') {
            keysArray.push(letters);
        } else if (difficulty === 'hard') {
            keysArray.push(numeric, letters);
        }

        keysArray.forEach((pack) => {
            for (let code = pack[0]; code <= pack[1]; code += 1) {
                const symbol = String.fromCharCode(code).toUpperCase();
                const key = this.#createKey(symbol);
                keyBoard.append(key);
            }
        })

        middleSection.append(keyBoard);
        return middleSection;
    }

    #createBottomSection() {
        const bottomSection = document.createElement('section');
        const rightContainer = document.createElement('div');
        const backButton = this.#createControlButton('Back');
        const repeatButton = this.#createControlButton('Repeat');
        const newGameButton = this.#createControlButton('New Game');

        bottomSection.classList.add('bottom__play_section');
        rightContainer.classList.add('bottom__right_container');
        backButton.classList.add('back__button');
        repeatButton.classList.add('repeat__button');
        newGameButton.classList.add('new_game__button');

        rightContainer.append(repeatButton, newGameButton);
        bottomSection.append(backButton, rightContainer);
        return bottomSection;
    }

    #createKey(code = '') {
        const key = document.createElement('button');
        key.classList.add('keyboard__key');
        key.setAttribute('data-key', code);
        key.textContent = code.slice(-1);
        return key;
    }

    #createControlButton(button = '') {
        const controlButton = document.createElement('button');
        controlButton.classList.add('main__button');
        controlButton.textContent = button;
        return controlButton;
    }

    createPlayScreen() {
        const mainSection = this.#createMainSection();
        const topSection = this.#createTopSection();
        const middleSection = this.#createMiddleSection();
        const bottomSection = this.#createBottomSection();
        mainSection.append(topSection, middleSection, bottomSection);
        return mainSection;
    }
}

function showPlayArea() {
    const playScreen = new PlayScreen(difficulty).createPlayScreen();
    wrapper[0].append(playScreen);
}

export default showPlayArea;
