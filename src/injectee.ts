// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import * as symbols from './symbols';

export type Injectee<Service, Dependencies> = { [symbols.injectee]: (deps: Dependencies) => Service; };

export type ServiceFactory<Service, Dependencies> = (dependencies: Dependencies) => Service;

export type ServiceConstructor<Service, Dependencies> = new (dependencies: Dependencies) => Service;

export type ServiceOf<T> =
    T extends ServiceFactory<infer U, any> ? U :
    T extends ServiceConstructor<infer U, any> ? U :
    never;

export type DependenciesOf<T> =
    T extends ServiceFactory<any, infer U> ? U :
    T extends ServiceConstructor<any, infer U> ? U :
    never;

export function factory<Factory extends ServiceFactory<any, any>>(func: Factory)
    : Factory & Injectee<ServiceOf<Factory>, DependenciesOf<Factory>> {
    type Service = ServiceOf<Factory>;
    type Dependencies = DependenciesOf<Factory>;
    const factory = (
        (dependencies: Dependencies, ...args: []) => func(dependencies, ...args)
    ) as Factory & Injectee<Service, Dependencies>;
    factory[symbols.injectee] = (dependencies: Dependencies) => func(dependencies);
    return factory;
}

export function service<Constructor extends ServiceConstructor<any, any>>(ctor: Constructor)
    : Constructor & Injectee<ServiceOf<Constructor>, DependenciesOf<Constructor>> {
    type Service = ServiceOf<Constructor>;
    type Dependencies = DependenciesOf<Constructor>;
    const service = class {
        constructor(dependencies: Dependencies, ...args: []) {
            return new ctor(dependencies, ...args);
        }
    } as Constructor & Injectee<Service, Dependencies>;
    Object.setPrototypeOf(service, ctor);
    Object.setPrototypeOf(service.prototype, ctor.prototype);
    service[symbols.injectee] = (dependencies: Dependencies) => new ctor(dependencies);
    return service;
}
