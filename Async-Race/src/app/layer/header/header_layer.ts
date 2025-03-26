import './header_layer.css';
import type { ElementParams } from '../../helper/types';
import { CreateElement } from '../../utility/create_element';
import type { Router } from '../../router/router';

class HeaderLayer {
    private router: Router;
    constructor(router: Router) {
        this.router = router;
    }

    public addComponent(): HTMLElement {
        const params: ElementParams = {
            tag: 'header',
            classNames: ['header'],
            callback: (): void => {},
        };
        const header: HTMLElement = new CreateElement(params).getElement();
        header.append(this.addButtons());
        return header;
    }

    private addButtons(): DocumentFragment {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const garageParams: ElementParams = {
            tag: 'button',
            classNames: ['header__button', 'garage__button'],
            callback: (event: Event): void => {
                this.navigateToPage(event);
            },
        };
        const winnersParams: ElementParams = {
            tag: 'button',
            classNames: ['header__button', 'winners__button'],
            callback: (event: Event): void => {
                this.navigateToPage(event);
            },
        };
        const garageButton: HTMLElement = new CreateElement(garageParams).getElement();
        const winnersButton: HTMLElement = new CreateElement(winnersParams).getElement();
        garageButton.textContent = 'Garage';
        winnersButton.textContent = 'Winners';
        fragment.append(garageButton, winnersButton);
        return fragment;
    }

    private navigateToPage(event: Event): void {
        if (event.target instanceof HTMLElement) {
            const currentButton: HTMLElement = event.target;
            const pageName: string = currentButton.textContent!.toLowerCase();
            this.router.navigate(pageName);
        }
    }
}

export { HeaderLayer };
