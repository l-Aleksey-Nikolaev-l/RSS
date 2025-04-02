import { Api } from '../../service/api';

type QueryParams = {
    key: string;
    value: string;
};

class CarEngine {
    public async getEngine(carId: number): Promise<object> {
        const query: Array<QueryParams> = [
            {
                key: 'id',
                value: String(carId),
            },
            {
                key: 'status',
                value: 'started',
            },
        ];
        const newEngine: Api = new Api();
        return await newEngine.requestEngineStatus(query);
    }

    public async driveEngine(carId: number): Promise<object> {
        const query: Array<QueryParams> = [
            {
                key: 'id',
                value: String(carId),
            },
            {
                key: 'status',
                value: 'drive',
            },
        ];
        const newEngine: Api = new Api();
        return await newEngine.requestEngineStatus(query);
    }
}

export { CarEngine };
