// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

export function isFunction(value: unknown): value is (...args: any[]) => any {
    return typeof value === 'function';
}

export function once<T>(func: () => T): () => T {
    let first = true;
    let value: T;
    return () => {
        if (first) {
            value = func();
            first = false;
        }
        return value;
    };
}
