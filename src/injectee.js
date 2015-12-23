// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import assert from 'power-assert';

import * as symbols from './symbols';
import * as utils from './utils';

export function factory(func) {
    assert(utils.isFunction(func));
    const injectee = (...args) => func(...args);
    injectee[symbols.injectee] = injectee;
    return injectee;
}

export function service(ctor) {
    assert(utils.isFunction(ctor));
    const injectee = (...args) => new ctor(...args);
    injectee[symbols.injectee] = injectee;
    return injectee;
}
