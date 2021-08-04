// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import type { Injectee } from './injectee';
import * as symbols from './symbols';
import * as utils from './utils';

export type ServiceList = Record<string, unknown>;

type ContainerInternal<ServiceLists extends ServiceList[]> =
    ServiceLists extends [] ? Record<never, never> :
    ServiceLists extends [infer T] ? {
        [K in keyof T]: T[K] extends Injectee<infer U, any> ? U : T[K];
    } :
    ServiceLists extends [infer T, ...infer U] ? (
        T extends ServiceList ? (
            U extends ServiceList[] ? Container<[T]> & Container<U> : never
        ) :
        never
    ) :
    never;

export type Container<ServiceLists extends ServiceList[]> = {
    readonly [K in keyof ContainerInternal<ServiceLists>]: ContainerInternal<ServiceLists>[K];
};

export function container<ServiceLists extends ServiceList[]>(...serviceLists: ServiceLists): Container<ServiceLists> {
    const con = {};
    const keys = new Set<string>();
    const services = serviceLists.reduce((prototype, ss) => {
        const services = Object.create(prototype);
        for (const key in ss) {
            keys.add(key);
            Object.defineProperty(services, key, {
                get: utils.once(() => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const s = ss[key] as any;
                    if (!utils.isFunction(s[symbols.injectee]))
                        return s;
                    return s[symbols.injectee](Object.create(con, {
                        [key]: { get: () => prototype[key] },
                    }));
                }),
            });
        }
        return services;
    }, {});
    for (const key of keys) {
        Object.defineProperty(con, key, {
            enumerable: true,
            get: () => services[key],
        });
    }
    return con as Container<ServiceLists>;
}
