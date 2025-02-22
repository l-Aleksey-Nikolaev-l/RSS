import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: any): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(event: MouseEvent, callback: any): void {
        let target: HTMLElement = <HTMLElement>event.target;
        const newsContainer: HTMLElement = <HTMLElement>event.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = <string>target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;
