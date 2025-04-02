import { Layer } from './layer/layer';
import { Router } from './router/router';
import { Pages } from './router/pages';
import type { Page } from './page/page';
import type { Routes } from './helper/types';

class App {
    private readonly router: Router;
    private layer: Layer;

    constructor() {
        const routes: Routes[] = this.createRoutes();
        this.router = new Router(routes);
        this.layer = new Layer(this.router);
        this.createView();
    }

    private createView(): void {
        document.body.append(this.layer.addComponent());
    }

    private createRoutes(): Routes[] {
        return [
            {
                path: '',
                callback: async (): Promise<void> => {
                    const { GaragePage } = await import('./page/garage/garage_page');
                    this.setContent(Pages.GARAGE, new GaragePage());
                },
            },
            {
                path: `${Pages.GARAGE}`,
                callback: async (): Promise<void> => {
                    const { GaragePage } = await import('./page/garage/garage_page');
                    this.setContent(Pages.GARAGE, new GaragePage());
                },
            },
            {
                path: `${Pages.WINNERS}`,
                callback: async (): Promise<void> => {
                    const { WinnersPage } = await import('./page/winners/winners_page');
                    this.setContent(Pages.WINNERS, new WinnersPage());
                },
            },
            {
                path: `${Pages.ERROR}`,
                callback: async (): Promise<void> => {
                    const { ErrorPage } = await import('./page/error/error_page');
                    this.setContent(Pages.ERROR, new ErrorPage());
                },
            },
        ];
    }

    private setContent(pageName: string, page: Page): void {
        this.layer.setPage(page);
        window.history.pushState({}, '', pageName);
    }
}

export { App };
