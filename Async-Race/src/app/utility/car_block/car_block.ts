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

    private createCarImage(color: string = '#df4343'): SVGSVGElement {
        const carIcon: SVGSVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const carPath: SVGPathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        carIcon.setAttribute('width', '24px');
        carIcon.setAttribute('height', '24px');
        carIcon.setAttribute('viewBox', '0 -960 960 960');
        carPath.setAttribute('fill', color);
        carPath.setAttribute(
            'd',
            'M280-160q-45 0-78.5-28.5T162-262q-38-20-60-57t-22-81q0-53 30.5-94.5T' +
                '192-552l-72-72-12 12q-11 11-28 11t-28-11q-11-11-11-28t11-28l80-80q11-11 28-11t' +
                '28 11q11 11 11 28t-11 28l-12 12 56 56 32-94q12-37 43.5-59.5T378-800h204q39 0 70.5 22.5T' +
                '696-718l54 162q57 11 93.5 55T880-400q0 44-22 81t-60 57q-6 45-39.5 73.5T' +
                '680-160q-38 0-68.5-22T568-240H392q-13 36-43.5 58T280-160Zm16-400h144v-160h-62q-13 0-23 7.5T' +
                '340-692l-44 132Zm224 0h144l-44-132q-5-13-15-20.5t-23-7.5h-62v160ZM392-320h176q13-36 43.5-58t' +
                '68.5-22q30 0 56 14t44 38q9-11 14.5-24.5T800-400q0-33-23.5-56.5T720-480H240q-33 0-56.5 23.5T' +
                '160-400q0 14 5.5 27.5T180-348q18-24 44-38t56-14q38 0 68.5 22t43.5 58Zm-112 80q17 0 28.5-11.5T' +
                '320-280q0-17-11.5-28.5T280-320q-17 0-28.5 11.5T240-280q0 17 11.5 28.5T280-240Zm400 0q17 0 28.5-11.5T' +
                '720-280q0-17-11.5-28.5T680-320q-17 0-28.5 11.5T640-280q0 17 11.5 28.5T680-240ZM480-400Z'
        );
        carIcon.append(carPath);
        return carIcon;
    }

    private manageClick(event: MouseEvent): void {
        if (event.target instanceof HTMLButtonElement) {
            const currentEvent: HTMLElement = event.target;
            const carIdStart: string | null = currentEvent.getAttribute('start_car-id');
            const carIdStop: string | null = currentEvent.getAttribute('stop_car-id');
            const carIdEdit: string | null = currentEvent.getAttribute('edit_car-id');
            const carIdRemove: string | null = currentEvent.getAttribute('remove_car-id');
            if (carIdStart !== null) {
                const car: HTMLElement = document.querySelector(`[car-id="${carIdStart}"]`)!;
                currentEvent.setAttribute('disabled', 'true');
                const engineShop: CarEngine = new CarEngine();
                const newEngine: Promise<Engine> = engineShop.startEngine(Number(carIdStart));
                newEngine.then((engine: Engine): void => {
                    car.firstElementChild!.classList.add('car_drive');
                    const trackLength: number = car.parentElement!.offsetWidth - 60;
                    let count: number = 0;
                    const interval: NodeJS.Timeout = setInterval((): void => {
                        if (count >= trackLength) {
                            currentEvent.removeAttribute('disabled');
                            car.firstElementChild!.classList.remove('car_drive');
                            clearInterval(interval);
                        } else {
                            count += trackLength / engine.velocity / 10;
                            car.style.transform = `translateX(${count}px)`;
                        }
                    }, 10);
                    const breakEngine: Promise<{ status: boolean }> = engineShop.driveEngine(Number(carIdStart));
                    breakEngine.catch((): void => {
                        currentEvent.removeAttribute('disabled');
                        car.firstElementChild!.classList.remove('car_drive');
                        clearInterval(interval);
                    });
                });
            } else if (carIdStop !== null) {
                const car: HTMLElement = document.querySelector(`[car-id="${carIdStop}"]`)!;
                const engineShop: CarEngine = new CarEngine();
                const newEngine: Promise<Engine> = engineShop.stopEngine(Number(carIdStop));
                newEngine.then((): void => {
                    car.removeAttribute('style');
                    car.firstElementChild!.classList.remove('car_drive');
                });
            } else if (carIdEdit !== null) {
                const car: HTMLElement = document.querySelector(`[car-id="${carIdEdit}"]`)!;
                console.log('edit', car);
            } else if (carIdRemove !== null) {
                const carBlock: HTMLElement = document.querySelector(`[data-car_block="${carIdRemove}"]`)!;
                carBlock.remove();
            }
        }
    }
}

export { CarBlock };
