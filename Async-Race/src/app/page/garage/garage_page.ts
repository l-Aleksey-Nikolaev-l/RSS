import './garage_page.css';
import { Page } from '../page';
import { CreateElement } from '../../utility/create_element';
import type { ElementParams } from '../../helper/types';

class GaragePage extends Page {
    constructor() {
        super();
    }

    public setComponent(): HTMLElement {
        const params: ElementParams = {
            tag: 'div',
            classNames: ['garage__page'],
            callback: (): void => {},
        };
        const garagePage: HTMLElement = new CreateElement(params).getElement();
        garagePage.textContent = 'GARAGE PAGE!';
        return garagePage;
    }
}

export { GaragePage };
