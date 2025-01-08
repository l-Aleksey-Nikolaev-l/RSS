import {wrapper} from './variables.js';

const rulesArray = [
    'The game consists of 5 rounds and 3 levels of difficulty. ' +
    'In each round, the user must repeat a sequence of keyboard ' +
    'symbols based on the level of difficulty.',
    'The levels of difficulty are:',
    ['Easy: only numbers (0-9);',
        'Medium: only letters (A-Z);',
        'Hard: letters (A-Z) and numbers (0-9).'
    ]
]

class Rules {

    #rulesArray = [
        'The game consists of 5 rounds and 3 levels of difficulty. ' +
        'In each round, the user must repeat a sequence of keyboard ' +
        'symbols based on the level of difficulty.',
        'The levels of difficulty are:',
        ['Easy: only numbers (0-9);',
        'Medium: only letters (A-Z);',
        'Hard: letters (A-Z) and numbers (0-9).'
        ]
    ]

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
        backButton.classList.add('main__button');
        backButton.textContent = '< Back';
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
    const rules = new Rules().show();
    wrapper[0].append(rules);
}

export default showRules;
