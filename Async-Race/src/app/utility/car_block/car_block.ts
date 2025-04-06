import { CarBase } from './car_base';
import { CarEngine } from './car_engine';

type Engine = {
    distance: number;
    velocity: number;
};

type Car = {
    name: string;
    color: string;
    id: number;
};

class CarBlock {
    constructor() {}

    public async buildCars(): Promise<HTMLElement> {
        const carsContainer: HTMLElement = document.createElement('div');
        carsContainer.classList.add('cars_container');
        const allCars: Promise<object> = new CarBase().getAllCars();
        return await allCars.then((cars: object) => {
            Object.values(cars).forEach((carParams: Car) => {
                const newCar: HTMLElement = this.createCar(carParams);
                carsContainer.append(newCar);
            });
            return carsContainer;
        });
    }
}

export { CarBlock };
