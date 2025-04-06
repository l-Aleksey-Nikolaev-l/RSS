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

    public createCar(carParams: Car): HTMLElement {
        const carBlock: HTMLElement = document.createElement('div');
        const carTopContainer: HTMLElement = document.createElement('div');
        const carBottomContainer: HTMLElement = document.createElement('div');
        const carManageContainer: HTMLElement = document.createElement('div');
        const carControlsContainer: HTMLElement = document.createElement('div');
        const trackContainer: HTMLElement = document.createElement('div');
        const editButton: HTMLElement = document.createElement('button');
        const removeButton: HTMLElement = document.createElement('button');
        const startButton: HTMLElement = document.createElement('button');
        const stopButton: HTMLElement = document.createElement('button');
        const carName: HTMLElement = document.createElement('label');
        const car: HTMLElement = document.createElement('div');
        const finishFlag: HTMLElement = document.createElement('div');
        carBlock.setAttribute('data-car_block', carParams.id.toString());
        carBlock.classList.add('car_block');
        carTopContainer.classList.add('car_block__top');
        carBottomContainer.classList.add('car_block__bottom');
        carManageContainer.classList.add('car_block__manage');
        carControlsContainer.classList.add('car_block__controls');
        trackContainer.classList.add('car_block__track');
        editButton.classList.add('car_button', 'edit_button');
        removeButton.classList.add('car_button', 'remove_button');
        startButton.classList.add('car_button', 'start_button');
        stopButton.classList.add('car_button', 'stop_button');
        carName.classList.add('car_name');
        finishFlag.classList.add('finish_flag');
        car.classList.add('car');
        car.setAttribute('car-id', carParams.id.toString());
        editButton.setAttribute('edit_car-id', carParams.id.toString());
        removeButton.setAttribute('remove_car-id', carParams.id.toString());
        startButton.setAttribute('start_car-id', carParams.id.toString());
        stopButton.setAttribute('stop_car-id', carParams.id.toString());
        editButton.textContent = 'Edit';
        removeButton.textContent = 'Remove';
        startButton.textContent = 'Start';
        stopButton.textContent = 'Stop';
        carName.textContent = carParams.name;
        car.append(this.createCarImage(carParams.color));
        trackContainer.append(car, finishFlag);
        carControlsContainer.append(startButton, stopButton);
        carBottomContainer.append(carControlsContainer, trackContainer);
        carManageContainer.append(editButton, removeButton);
        carTopContainer.append(carManageContainer, carName);
        carBlock.append(carTopContainer, carBottomContainer);
        carBlock.addEventListener('click', this.manageClick);
        return carBlock;
    }
}

export { CarBlock };
