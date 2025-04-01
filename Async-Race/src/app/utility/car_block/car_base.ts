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

    public getAllCars(): void {
        const allCars: Promise<Response> = new Api().requestAllData('garage');
        allCars.then((cars: Response): void => {
            const newEngine: Promise<Response> | null = this.engine;
            newEngine?.then((res: object) => JSON.stringify(res));
            console.log(cars);
        });
    }

    public getCarById(id: number = 0): void {
        const queryParams: Array<QueryParams> = [
            {
                key: 'id',
                value: String(id),
            },
        ];
        const car: Promise<Response> = new Api().requestData('garage', queryParams);
        car.then((response: Response): void => {
            console.log(response);
        });
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
