// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import assert from 'assert';
import sinon from 'sinon';

import defaultExports, * as exports from '../src/di';

describe('container method', () => {
    it('is exported', () => {
        assert(typeof defaultExports.container === 'function');
        assert(typeof exports.container === 'function');
        assert(defaultExports.container === exports.container);
    });

    describe('when called with values', () => {
        let container;

        beforeEach(() => {
            container = exports.container(
                { a: 1 },
                { b: 2 },
                { c: () => 3 },
                { d: 4, e: 5 },
                { d: 5 },
                { e: 6 }
            );
        });

        it('creates container from values', () => {
            assert(container.a === 1);
            assert(container.b === 2);
            assert(typeof container.c === 'function');
            assert(container.c() === 3);
        });

        it('overwrites values which have the same names', () => {
            assert(container.d === 5);
            assert(container.e === 6);
        });
    });

    describe('when called with services', () => {
        let container;
        /** @type {any} */
        let spies;

        beforeEach(() => {
            const wrap = (v) => Object.assign(v, { [exports.injectee]: v });
            spies = {};
            spies.a1 = wrap(sinon.spy(() => ({ a: 1 })));
            spies.b1 = wrap(sinon.spy(({ a }) => ({ b: 1 })));
            spies.c1 = wrap(sinon.spy(({ d }) => ({ c: 1 })));
            spies.c2 = wrap(sinon.spy(({ b }) => ({ c: 2 })));
            spies.d1 = wrap(sinon.spy(({ c }) => ({ d: 1 })));
            spies.d2 = wrap(sinon.spy(({ d }) => ({ d: 2 })));
            container = exports.container(
                { a: spies.a1 },
                { b: spies.b1, c: spies.c1 },
                { d: spies.d1 },
                { c: spies.c2, d: spies.d2 }
            );
        });

        it('produces a service lazily', () => {
            assert(spies.a1.callCount === 0);
            const { a } = container;
            assert(spies.a1.callCount === 1);
            assert(a === spies.a1.firstCall.returnValue);
        });

        it('produces a service with dependency', () => {
            const { a } = container;
            assert(spies.a1.callCount === 1);
            assert(spies.b1.callCount === 0);
            assert(a === spies.a1.firstCall.returnValue);
            const { b } = container;
            assert(spies.a1.callCount === 1);
            assert(spies.b1.callCount === 1);
            assert(b === spies.b1.firstCall.returnValue);
        });

        it('overwrites services which have the same names', () => {
            assert(spies.a1.callCount === 0);
            assert(spies.b1.callCount === 0);
            assert(spies.c1.callCount === 0);
            assert(spies.c2.callCount === 0);
            const { c } = container;
            assert(spies.a1.callCount === 1);
            assert(spies.b1.callCount === 1);
            assert(spies.c1.callCount === 0);
            assert(spies.c2.callCount === 1);
            assert(c === spies.c2.firstCall.returnValue);
        });

        it('resolves services even which has the same names', () => {
            assert(spies.a1.callCount === 0);
            assert(spies.b1.callCount === 0);
            assert(spies.c1.callCount === 0);
            assert(spies.c2.callCount === 0);
            assert(spies.d1.callCount === 0);
            assert(spies.d2.callCount === 0);
            const { d } = container;
            assert(spies.a1.callCount === 1);
            assert(spies.b1.callCount === 1);
            assert(spies.c1.callCount === 0);
            assert(spies.c2.callCount === 1);
            assert(spies.d1.callCount === 1);
            assert(spies.d2.callCount === 1);
            assert(d === spies.d2.firstCall.returnValue);
            assert(spies.d2.firstCall.args[0].d ===
                spies.d1.firstCall.returnValue);
            assert(spies.d1.firstCall.args[0].d === undefined);
            assert(spies.d1.firstCall.args[0].c ===
                spies.c2.firstCall.returnValue);
        });
    });
});
