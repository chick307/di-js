// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import defaultExports, * as exports from '../src/di';

describe('factory method', () => {
    it('is exported', () => {
        expect(typeof defaultExports.factory).toBe('function');
        expect(typeof exports.factory).toBe('function');
        expect(defaultExports.factory).toBe(exports.factory);
    });

    it('returns a wapper of the passed function', () => {
        const spy = jest.fn();
        const a = exports.factory(spy);
        expect(a).toBeInstanceOf(Function);
        expect(spy).not.toHaveBeenCalled();
        a({ x: 1 });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ x: 1 });
    });

    it('returns an injectee object', () => {
        const spy = jest.fn(() => ({ x: 1 }));
        const a = exports.factory(spy);
        expect(a[exports.injectee]({ y: 2 })).toEqual({ x: 1 });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ y: 2 });
    });
});

describe('service method', () => {
    it('is exported', () => {
        expect(typeof defaultExports.service).toBe('function');
        expect(typeof exports.service).toBe('function');
        expect(defaultExports.service).toBe(exports.service);
    });

    it('returns a wapper of the passed constructor', () => {
        const spy = jest.fn();
        const a = exports.service(class {
            constructor(...args: unknown[]) {
                spy(...args);
            }
        });
        expect(a).toBeInstanceOf(Function);
        expect(spy).not.toHaveBeenCalled();
        new a({ x: 1 });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ x: 1 });
    });

    it('returns an injectee object', () => {
        const spy = jest.fn();
        class A {
            x = 1;

            constructor(...args: unknown[]) {
                spy(...args);
            }
        }
        const a = exports.service(A);
        const v = a[exports.injectee]({ y: 2 });
        expect(v).toBeInstanceOf(A);
        expect(v).toEqual({ x: 1 });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ y: 2 });
    });
});
