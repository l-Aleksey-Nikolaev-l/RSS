function defineType<T, K extends keyof T>(data: T, key: K): T[K] {
    return data[key];
}

export { defineType };
