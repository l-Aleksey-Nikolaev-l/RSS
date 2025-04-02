import { Api } from '../../service/api';
import { CarEngine } from './car_engine';

type QueryParams = {
    key: string;
    value: string;
};

class CarBase extends CarEngine {
    constructor() {
        super();
        this.getEngine();
        this.getAllCars();
        // this.getCarById(11);
        // this.createNewCar();
        // this.deleteCar(11);
        // this.updateCar(11);
    }

    public async getAllCars(): Promise<object> {
        const allCars: Promise<Response> = new Api().requestAllData('garage');
        return await allCars.then((allCars: Response) => allCars);
    }

    public async getCarById(id: number = 0): Promise<object> {
        const queryParams: Array<QueryParams> = [
            {
                key: 'id',
                value: String(id),
            },
        ];
        const car: Promise<Response> = new Api().requestData('garage', queryParams);
        return await car.then((oneCar: Response) => oneCar);
    }

    public createNewCar(): void {
        const api: Api = new Api();
        const car = {
            name: `car11`,
            color: `color11`,
        };
        api.addNewData('garage', JSON.stringify(car));
    }

    public deleteCar(id: number = 0): void {
        const queryParams: Array<QueryParams> = [
            {
                key: 'id',
                value: String(id),
            },
        ];
        const car: Promise<Response> = new Api().removeData('garage', queryParams);
        car.then((response: Response): void => {
            console.log(response);
        });
    }

    public updateCar(id: number = 0): void {
        const testCars = {
            name: `FORD${id}`,
            color: `color${id}`,
            id: String(id),
        };
        const api: Api = new Api();
        api.updateData('garage', String(id), JSON.stringify(testCars));
    }
}

export { CarBase };
