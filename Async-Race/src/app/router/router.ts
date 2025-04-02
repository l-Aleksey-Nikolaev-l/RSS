import { Pages } from './pages';

type Routes = {
    path: string;
    callback: (resource: string) => void;
};

type UserRequest = {
    path: string;
    resource: string;
};

class Router {
    private fullUrl: UserRequest;
    private fullPath: string;
    private routes: Array<Routes>;
    constructor(routes: Array<Routes>) {
        this.fullUrl = this.parseUrl('');
        this.fullPath = '';
        this.routes = routes;
        document.addEventListener('DOMContentLoaded', () => {
            this.bowserChangeHandler();
        });
        window.addEventListener('popstate', this.bowserChangeHandler.bind(this));
    }

    public navigate(url: string): void {
        const request: UserRequest = this.parseUrl(url);
        const pathForFind: string = request.resource === '' ? request.path : `${request.path}/${request.resource}`;
        const route: Routes | undefined = this.routes.find((item: Routes) => item.path === pathForFind);
        if (!route) {
            this.redirectToNotFound();
            return;
        } else {
            route.callback(request.resource);
        }
    }

    private parseUrl(url: string): UserRequest {
        this.fullUrl = {
            path: '',
            resource: '',
        };
        [this.fullUrl.path = '', this.fullUrl.resource = ''] = url.split('/');
        return this.fullUrl;
    }

    private redirectToNotFound(): void {
        const routeNotFound: Routes | undefined = this.routes.find((item: Routes) => item.path === Pages.ERROR);
        if (routeNotFound) {
            this.navigate(routeNotFound.path);
        }
    }

    private bowserChangeHandler(): void {
        this.fullPath = this.getCurrentPath();
        this.navigate(this.fullPath);
    }

    private getCurrentPath(): string {
        if (window.location.hash) {
            this.fullPath = window.location.hash.slice(1);
        } else {
            this.fullPath = window.location.pathname.slice(1);
        }
        return this.fullPath;
    }
}

export { Router };
