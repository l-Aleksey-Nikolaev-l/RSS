import addRandomCards from "./cards.js";
import {filterTabs, setTab} from './variables.js'

function switchTab(event) {
    if (!event.target.childElementCount) {
        for (let i = 0; i < filterTabs.childElementCount; i++) {
            const childClasses = filterTabs.children[i].classList;
            if (!childClasses.contains('mg--tabs__selected')) {
                continue;
            }
            childClasses.remove('mg--tabs__selected');
            break;
        }
        event.target.classList.add('mg--tabs__selected');
        setTab(event.target.textContent.toLowerCase());
        addRandomCards(false);
    }
}

export default switchTab;
