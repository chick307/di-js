// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import assert from 'assert';

import defaultExports, * as exports from '../src/di';

describe('factory method', () => {
    it('is exported', () => {
        assert(typeof defaultExports.factory === 'function');
        assert(typeof exports.factory === 'function');
        assert(defaultExports.factory === exports.factory);
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
        const spy = jest.fn();
        const a = exports.factory(spy);
        assert(a[exports.injectee] === a);
    });
});

describe('service method', () => {
    it('is exported', () => {
        assert(typeof defaultExports.service === 'function');
        assert(typeof exports.service === 'function');
        assert(defaultExports.service === exports.service);
    });

    it('returns a wapper of the passed constructor', () => {
        const spy = jest.fn();
        const a = exports.service(class {
            constructor(...args) {
                spy(...args);
            }
        });
        expect(a).toBeInstanceOf(Function);
        expect(spy).not.toHaveBeenCalled();
        a({ x: 1 });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toHaveBeenCalledWith({ x: 1 });
    });

    it('returns an injectee object', () => {
        const spy = jest.fn();
        const a = exports.service(spy);
        assert(a[exports.injectee] === a);
    });
});
