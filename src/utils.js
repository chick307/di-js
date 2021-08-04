// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import assert from 'assert';

export function isFunction(value) {
    return typeof value === 'function';
}

export function once(func) {
    assert(isFunction(func));
    let first = true;
    let value;
    return () => {
        if (first) {
            value = func();
            first = false;
        }
        return value;
    };
}
