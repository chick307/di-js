// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import assert from 'power-assert';
import sinon from 'sinon';

import defaultExports, * as exports from '../src/di';

describe('factory method', () => {
    it('is exported', () => {
        assert(typeof defaultExports.factory === 'function');
        assert(typeof exports.factory === 'function');
        assert(defaultExports.factory === exports.factory);
    });

    it('returns a wapper of the passed function', () => {
        const spy = sinon.spy();
        const a = exports.factory(spy);
        assert(typeof a === 'function');
        assert(spy.callCount === 0);
        a({ x: 1 });
        assert(spy.callCount === 1);
        assert(spy.firstCall.calledWith({ x: 1 }));
    });

    it('returns an injectee object', () => {
        const spy = sinon.spy();
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
        const spy = sinon.spy();
        const a = exports.service(spy);
        assert(typeof a === 'function');
        assert(spy.callCount === 0);
        a({ x: 1 });
        assert(spy.callCount === 1);
        assert(spy.firstCall.calledWith({ x: 1 }));
        assert(spy.firstCall.calledWithNew());
    });

    it('returns an injectee object', () => {
        const spy = sinon.spy();
        const a = exports.service(spy);
        assert(a[exports.injectee] === a);
    });
});
