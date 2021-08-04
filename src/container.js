// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import * as symbols from './symbols';
import * as utils from './utils';

/** @type {(...serviceLists: any[]) => any} */
export function container(...serviceLists) {
    const con = {};
    const keys = new Set();
    const services = serviceLists.reduce((prototype, ss) => {
        const services = Object.create(prototype);
        for (const key in ss) {
            keys.add(key);
            Object.defineProperty(services, key, {
                get: utils.once(() => {
                    const s = ss[key];
                    if (!utils.isFunction(s[symbols.injectee])) return s;
                    return s[symbols.injectee](Object.create(con, {
                        [key]: { get: () => prototype[key] }
                    }));
                })
            });
        }
        return services;
    }, {});
    for (const key of keys) {
        Object.defineProperty(con, key, {
            enumerable: true,
            get: () => services[key]
        });
    }
    return con;
}
