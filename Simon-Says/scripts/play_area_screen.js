import {createKeysArray} from './heplers.js';
import {
    wrapper,
    difficulty,
    levelAttempt,
    levelRound,
    maxLevelRounds,
    addKeyToCollection
} from './variables.js';

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
        attemptNumber.textContent = levelAttempt.toString();
        roundText.classList.add('round__text');
        roundText.textContent = 'Round:';
        roundNumber.classList.add('round__number');
        roundNumber.textContent = levelRound.toString() + '/' + maxLevelRounds.toString();

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
        keyBoard.classList.add('keyboard', 'keyboard__block', `keyboard__${this.difficulty}`);
        keyBoard.id = 'keyboard';

        let keysArray = createKeysArray();

        keysArray.forEach((pack) => {
            for (let code = pack[0]; code <= pack[1]; code += 1) {
                const symbol = String.fromCharCode(code).toUpperCase();
                addKeyToCollection(key);
                const button = this.#createButton(symbol);
                keyBoard.append(button);
            }
        });

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
        repeatButton.setAttribute('disabled', '');
        newGameButton.classList.add('new_game__button');
        newGameButton.setAttribute('disabled', '');

        rightContainer.append(repeatButton, newGameButton);
        bottomSection.append(backButton, rightContainer);
        return bottomSection;
    }

    #createButton(code = '') {
        const button = document.createElement('button');
        button.classList.add('keyboard__key');
        button.setAttribute('data-key', code);
        button.textContent = code.slice(-1);
        return button;
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
