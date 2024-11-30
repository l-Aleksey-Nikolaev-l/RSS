import {burgerButton} from './variables.js'

function closeMobileMenu() {
    if(window.innerWidth > 768) {
        burgerButton.checked = false;
    }
}

export default closeMobileMenu;
