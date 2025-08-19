import './error_page.css';
import { Page } from '../page';
import { CreateElement } from '../../utility/create_element';
import type { ElementParams } from '../../helper/types';

class ErrorPage extends Page {
    constructor() {
        super();
    }

    public setComponent(): HTMLElement {
        const params: ElementParams = {
            tag: 'div',
            classNames: ['error__page'],
            callback: (): void => {},
        };
        const errorPage: HTMLElement = new CreateElement(params).getElement();
        errorPage.textContent = 'ERROR PAGE!';
        return errorPage;
    }
}

export { ErrorPage };
