import { ResponseObject } from './types';

interface Callback {
    (res: ResponseObject): void;
}

export { Callback };
