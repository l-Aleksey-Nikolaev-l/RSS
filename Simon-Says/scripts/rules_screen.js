import {wrapper} from './variables.js';

const rulesArray = [
    'The game consists of 5 rounds and 3 levels of difficulty. ' +
    'In each round, the user must repeat a sequence of keyboard ' +
    'symbols based on the level of difficulty.',
    'The levels of difficulty are:',
    ['Easy: only numbers (0-9);',
        'Medium: only letters (A-Z);',
        'Hard: letters (A-Z) and numbers (0-9).'
    ],
    'The same symbol can be used multiple times in a sequence.',
    'For the letters, both upper and lower case letters are allowed and are ' +
    'treated as the same symbol (e.g. if the sequence has the letter "a", it is ' +
    'also possible to type "A")',
    'The first round starts with 2 symbols based on the level of difficulty.',
    'Each new round presents a new randomly generated sequence based on the level ' +
    'of difficulty, with the sequence length increasing by two symbols each round ' +
    '(culminating in a 10-symbol sequence by the 5th round).',
    'The user can use both virtual (by clicking keys on the screen) and physical ' +
    'keyboards (by pressing keys on their keyboard) to play the game.',
    'Handling NumPad events is not required. NumPad inputs can be ignored during ' +
    'the game.',
    'Pressing keys with symbols that are not part of the current difficulty level ' +
    'must be ignored during the game (e.g. for the "Medium" level, pressing any ' +
    'not letter key must be ignored).',
    'Only one key can be processed at a time. If the user attempts to press ' +
    'multiple keys simultaneously, the application should process only the first ' +
    'key press detected to prevent multiple inputs from being registered at the ' +
    'same moment.'
]

class Rules {

    constructor(rulesArray = []) {
        this.rulesArray = rulesArray;
    }

    #createMainSection() {
        const main = document.createElement('main');
        main.classList.add('main', 'main__rules_section');
        return main;
    }

    #createRulesList(rulesArray) {
        const rulesList = document.createElement('ul');
        rulesList.classList.add('rules__list');
        for (let index = 0; index < rulesArray.length; index += 1) {
            if (typeof rulesArray[index] !== 'string') {
                const subList = this.#createRulesList(rulesArray[index]);
                subList.classList.add('rules__list_sublist')
                rulesList.append(subList);
            } else {
                const rule = rulesArray[index];
                const ruleItem = this.#createRuleItem(rule, index + 1);
                rulesList.append(ruleItem);
            }
        }
        return rulesList;
    }

    #createRuleItem(rule = '', index = 0) {
        const ruleItem = document.createElement('li');
        ruleItem.classList.add('rule__item', `rule__item_${index}`);
        ruleItem.textContent = rule;
        return ruleItem;
    }

    #createBackButton() {
        const backButton = document.createElement('button');
        backButton.classList.add('main__button', 'back__button');
        backButton.textContent = 'Back';
        return backButton;
    }

    createRules() {
        const mainSection = this.#createMainSection();
        const ruleSection = this.#createRulesList(this.rulesArray);
        const backButton = this.#createBackButton();
        mainSection.append(ruleSection, backButton);
        return mainSection;
    }
}

function showRules() {
    const rules = new Rules(rulesArray).createRules();
    wrapper[0].append(rules);
}

export default showRules;
