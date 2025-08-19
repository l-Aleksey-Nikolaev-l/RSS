type ElementParams = {
    tag: string;
    classNames: string[];
    callback: (event: Event) => object | void;
};

type Routes = {
    path: string;
    callback: () => void | Promise<void>;
};

export { ElementParams, Routes };
