import './layer.css';
import type { Router } from '../router/router';
import type { Page } from '../page/page';
import { HeaderLayer } from './header/header_layer';
import { MainLayer } from './main/main_layer';
import { CreateElement } from '../utility/create_element';
import type { ElementParams } from '../helper/types';

class Layer {
    private readonly router: Router;
    private header: HeaderLayer;
    private main: MainLayer;
    constructor(router: Router) {
        this.router = router;
        this.header = new HeaderLayer(router);
        this.main = new MainLayer();
    }

    public addComponent(): HTMLElement {
        return this.createLayer();
    }

    public setPage(page: Page): void {
        this.main.setPage(page);
    }

    private createLayer(): HTMLElement {
        const params: ElementParams = {
            tag: 'div',
            classNames: ['wrapper'],
            callback: (): void => {},
        };
        const layer: HTMLElement = new CreateElement(params).getElement();
        layer.append(this.header.addComponent(), this.main.addComponent());
        return layer;
    }
}

export { Layer };
