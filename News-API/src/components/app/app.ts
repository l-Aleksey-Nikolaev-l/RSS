import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { ResponseObject } from '../../helpers/types';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesButtons: HTMLElement = <HTMLElement>document.querySelector('.sources');

        this.controller.getSources((data: ResponseObject): void => {
            this.view.drawSources(data);
        });

        sourcesButtons.addEventListener('click', (event: MouseEvent): void => {
            this.controller.getNews(event, (data: ResponseObject): void => {
                this.view.drawNews(data);
            });
        });
    }
}

export default App;
