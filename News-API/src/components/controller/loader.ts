import { Parameters, ResponseObject, UrlOptions } from '../../helpers/types';
import { Callback } from '../../helpers/interfaces';

class Loader {
    baseLink: string;
    options: object;
    constructor(baseLink: string, options: object) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp(
        params: Parameters,
        callback: Callback = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(params, callback);
    }

    errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(params: Parameters): string {
        const urlOptions: UrlOptions = { ...params.options, ...this.options };
        let url: string = `${this.baseLink}${params.endpoint}?`;

        Object.keys(urlOptions).forEach((key: string) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load(params: Parameters, callback: Callback): void {
        fetch(this.makeUrl(params), { method: params.method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: ResponseObject) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
