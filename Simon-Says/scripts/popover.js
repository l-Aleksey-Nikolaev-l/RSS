class Popover {
    #createFailPopover() {
        const popoverContainer = document.createElement('div');
        popoverContainer.classList.add('fail__popover');
        popoverContainer.id = 'fail__popover';
        popoverContainer.textContent = 'FAIL'
        return popoverContainer;
    }

    showFailPopover(levelAttempt = 0) {
        if (levelAttempt !== 0) {
            const keyboard = document.getElementById('keyboard');
            const failPopover = this.#createFailPopover();
            keyboard.append(failPopover);
        }
    }
}

const popover = new Popover();

export {
    popover
}
