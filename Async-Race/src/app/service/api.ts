const baseAPI: string = 'http://127.0.0.1:3000/';

type QueryParams = {
    key: string;
    value: string;
};

type RequestOptions = {
    method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';
    headers?: {
        'Content-Type': 'application/json' | 'text/plain';
    };
    body?: string;
};

class Api {
    constructor() {}

    public async requestAllData(path: 'garage' | 'winners'): Promise<Response> {
        const requestUrl: string = `${baseAPI}${path}`;
        const requestOptions: RequestOptions = {
            method: 'GET',
        };
        return await this.createRequest(requestUrl, requestOptions);
    }

    public async requestData(path: 'garage' | 'winners', queryParams: Array<QueryParams>): Promise<Response> {
        const query: string = this.createQuery(queryParams);
        const requestUrl: string = `${baseAPI}${path}${query}`;
        const requestOptions: RequestOptions = {
            method: 'GET',
        };
        return await this.createRequest(requestUrl, requestOptions);
    }

    public addNewData(path: 'garage' | 'winners', newData: string): void {
        const requestUrl: string = `${baseAPI}${path}`;
        const requestOptions: RequestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newData,
        };
        this.createRequest(requestUrl, requestOptions).then();
    }

    public async removeData(path: 'garage' | 'winners', queryParams: Array<QueryParams>): Promise<Response> {
        const query: string = queryParams[0].value;
        const requestUrl: string = `${baseAPI}${path}/${query}`;
        const requestOptions: RequestOptions = {
            method: 'DELETE',
        };
        return await this.createRequest(requestUrl, requestOptions);
    }

    public updateData(path: 'garage' | 'winners', id: string, newData: string): void {
        const requestUrl: string = `${baseAPI}${path}/${id}`;
        const requestOptions: RequestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newData,
        };
        this.createRequest(requestUrl, requestOptions).then();
    }

    public async requestEngineStatus(queryParams: Array<QueryParams>): Promise<Response> {
        const query: string = this.createQuery(queryParams);
        const requestUrl: string = `${baseAPI}engine${query}`;
        const requestOptions: RequestOptions = {
            method: 'PATCH',
        };
        return await this.createRequest(requestUrl, requestOptions);
    }

    private createQuery(queryParams: Array<QueryParams> = []): string {
        const params: string = queryParams
            .map((parameter: QueryParams): string => {
                return `${parameter.key}=${parameter.value}`;
            })
            .join('&');
        return queryParams.length ? '?' + params : '';
    }

    private async createRequest(url: string = '', options: RequestOptions): Promise<Response> {
        const response: Response = await fetch(url, options);
        return await response.json();
    }
}

export { Api };
