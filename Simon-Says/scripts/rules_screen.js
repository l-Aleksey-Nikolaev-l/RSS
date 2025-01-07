class Rules {

    #rulesArray = [
        'The game consists of 5 rounds and 3 levels of difficulty. ' +
        'In each round, the user must repeat a sequence of keyboard ' +
        'symbols based on the level of difficulty.',
        'The levels of difficulty are:' +
        'Easy: only numbers (0-9);' +
        'Medium: only letters (A-Z);' +
        'Hard: letters (A-Z) and numbers (0-9).'
    ]

    #rulesSection() {
        const rulesSection = document.createElement('section');
        rulesSection.classList.add('rules__section');
        const rulesList = document.createElement('ul');
        rulesList.classList.add('rules__list');
        const backButton = this.#addBackButton();

        for (let index = 0; index < this.#rulesArray.length; index += 1) {
            const rule = this.#rulesArray[index];
            const ruleItem = this.#addRule(rule, index + 1);
            rulesList.append(ruleItem);
        }
        rulesSection.append(rulesList, backButton);
        return rulesSection;
    }

    #addRule(rule = '', index = 0) {
        const ruleItem = document.createElement('li');
        ruleItem.classList.add('rule__item', `rule__item_${index}`);
        ruleItem.textContent = rule;
        return ruleItem;
    }

    #addBackButton() {
        const backButton = document.createElement('button');
        backButton.classList.add('main__button');
        backButton.textContent = '< Back';
        return backButton;
    }

    show() {
        return this.#rulesSection();
    }
}

function showRules() {
    console.log('Show Rules');
}

export default showRules;
