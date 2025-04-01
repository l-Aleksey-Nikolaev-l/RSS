import { Api } from '../../service/api';

type QueryParams = {
    key: string;
    value: string;
};

class CarEngine {
    public engine: Promise<Response> | null;
    constructor() {
        this.engine = null;
    }

    protected getEngine(): void {
        const query: Array<QueryParams> = [
            {
                key: 'id',
                value: '1',
            },
            {
                key: 'status',
                value: 'started',
            },
        ];
        const query2: Array<QueryParams> = [
            {
                key: 'id',
                value: '1',
            },
            {
                key: 'status',
                value: 'drive',
            },
        ];
        // const newEngine: Api = new Api();
        // const res1 = newEngine.requestEngineStatus(query);
        // const res2 = newEngine.requestEngineStatus(query2);
        // res1.then((res) => console.log(res));
        // res2.then((res) => console.log(res));
    }
}

export { CarEngine };
