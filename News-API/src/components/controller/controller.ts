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
        const sourceId: string = (event.currentTarget as HTMLSelectElement).value;
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
}

export default AppController;
