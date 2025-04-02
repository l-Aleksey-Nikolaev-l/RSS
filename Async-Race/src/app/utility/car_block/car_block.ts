import { CarBase } from './car_base';
import { CarEngine } from './car_engine';

class CarBlock {
    constructor() {}

    public buildCar = async (): Promise<HTMLElement> => {
        const oneCar: Promise<object> = new CarBase().getCarById(1);
        const oneEng: Promise<object> = new CarEngine().getEngine(1);
        return await oneCar.then(async (car: object): Promise<HTMLElement> => {
            return await oneEng.then((eng: object): HTMLElement => {
                const carContainer: HTMLElement = document.createElement('div');
                const carParams: HTMLElement = document.createElement('div');
                carParams.textContent += JSON.stringify(car);
                carParams.textContent += JSON.stringify(eng);
                carContainer.append(carParams);
                return carContainer;
            });
        });
    };
}

export { CarBlock };
