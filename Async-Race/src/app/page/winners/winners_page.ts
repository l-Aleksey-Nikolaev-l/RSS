import './winners_page.css';
import { Page } from '../page';
import { CreateElement } from '../../utility/create_element';
import type { ElementParams } from '../../helper/types';

class WinnersPage extends Page {
    constructor() {
        super();
    }

    public setComponent(): HTMLElement {
        const params: ElementParams = {
            tag: 'div',
            classNames: ['winners__page'],
            callback: (): void => {},
        };
        const winnersPage: HTMLElement = new CreateElement(params).getElement();
        winnersPage.textContent = 'WINEEEEERS!';
        return winnersPage;
    }
}

export { WinnersPage };
