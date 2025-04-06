import { Api } from '../../service/api';

type QueryParams = {
    key: string;
    value: string;
};

type Engine = {
    distance: number;
    velocity: number;
};

class CarEngine {
    public async startEngine(carId: number): Promise<Engine> {
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
        return Object.assign(await newEngine.requestEngineStatus(query));
    }

    public async driveEngine(carId: number): Promise<{ status: boolean }> {
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
        return Object.assign(await newEngine.requestEngineStatus(query));
    }
}

export { CarEngine };
