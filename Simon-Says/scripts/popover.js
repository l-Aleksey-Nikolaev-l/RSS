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
            this.#removeFailPopover();
        }
    }

    #removeFailPopover() {
        let removePopover = setTimeout(() => {
            const popover = document.getElementById('fail__popover');
            popover.remove()
            clearTimeout(removePopover);
        }, 1000);
    }
}

const popover = new Popover()

export {
    popover
}
