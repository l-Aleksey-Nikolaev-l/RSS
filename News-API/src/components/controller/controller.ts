import AppLoader from './appLoader';
import { Callback } from '../../helpers/interfaces';
import { Endpoint } from '../../helpers/enums';

class AppController extends AppLoader {
    getSources(callback: Callback): void {
        super.getResp(
            {
                endpoint: Endpoint.Sources,
            },
            callback
        );
    }

    getNews(event: Event, callback: Callback): void {
        let target: HTMLElement = <HTMLElement>event.target;
        const newsContainer: HTMLElement = <HTMLElement>event.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string = <string>target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoint.Everything,
                            options: {
                                sources: sourceId,
                                pageSize: 10,
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
