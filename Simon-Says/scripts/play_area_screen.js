import {wrapper, difficulty} from "./variables";

class PlayScreen {

    constructor(difficulty) {
        this.difficulty = difficulty;
    }

    #createMainSection() {
        const main = document.createElement('main');
        main.classList.add('main', 'main__play_section');
        return main;
    }
}

function showPlayArea() {
    console.log('Play The Game');
}

export default showPlayArea;
