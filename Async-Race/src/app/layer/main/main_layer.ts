import './main_layer.css';
import type { ElementParams } from '../../helper/types';
import { CreateElement } from '../../utility/create_element';
import type { Page } from '../../page/page';

class MainLayer {
    private main: HTMLElement;
    constructor() {
        this.main = this.addComponent();
    }

    public addComponent(): HTMLElement {
        const params: ElementParams = {
            tag: 'main',
            classNames: ['main'],
            callback: (): void => {},
        };
        this.main = new CreateElement(params).getElement();
        return this.main;
    }

    public setPage(page: Page): void {
        while (this.main.firstElementChild) {
            this.main.firstElementChild.remove();
        }
        this.main.append(page.setComponent());
    }
}

export { MainLayer };
