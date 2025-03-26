import type { ElementParams } from '../helper/types';

class CreateElement {
    private element: HTMLElement;
    constructor(parameters: ElementParams) {
        this.element = document.createElement('div');
        this.createElement(parameters);
    }

    public getElement(): HTMLElement {
        return this.element;
    }

    private setCssClasses(cssClasses: string[]): void {
        cssClasses.forEach((className: string): void => {
            this.element.classList.add(className);
        });
    }

    private createElement(parameters: ElementParams): void {
        this.element = document.createElement(parameters.tag);
        this.setCssClasses(parameters.classNames);
        this.setCallback(parameters);
    }

    private setCallback(params: ElementParams): void {
        if (typeof params.callback === 'function') {
            this.element.addEventListener('click', (event: Event) => params.callback(event));
        }
    }
}

export { CreateElement };
