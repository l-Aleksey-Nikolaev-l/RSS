import './garage_page.css';
import { Page } from '../page';
import { CreateElement } from '../../utility/create_element';
import type { ElementParams } from '../../helper/types';
import { CarBlock } from '../../utility/car_block/car_block';

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
        const carBlock: Promise<HTMLElement> = new CarBlock().buildCar();
        carBlock.then((car: HTMLElement): void => {
            garagePage.append(car);
        });
        garagePage.textContent = 'GARAGE PAGE!';
        return garagePage;
    }
}

export { GaragePage };
