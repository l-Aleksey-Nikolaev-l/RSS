import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start(): void {
        const sourcesButtons: HTMLElement = document.querySelector('.sources') as HTMLElement;

        this.controller.getSources((data: any): void => {
            this.view.drawSources(data);
        });

        sourcesButtons.addEventListener('click', (event: MouseEvent) => {
            this.controller.getNews(event, (data: any): void => {
                this.view.drawNews(data);
            });
        });
    }
}

export default App;
