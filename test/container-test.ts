// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import defaultExports, * as exports from '../src/di';

describe('container method', () => {
    it('is exported', () => {
        expect(typeof defaultExports.container).toBe('function');
        expect(typeof exports.container).toBe('function');
        expect(defaultExports.container).toBe(exports.container);
    });

    describe('when called with values', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let container: Record<string, any>;

        beforeEach(() => {
            container = exports.container(
                { a: 1 },
                { b: 2 },
                { c: () => 3 },
                { d: 4, e: 5 },
                { d: 5 },
                { e: 6 },
            );
        });

        it('creates container from values', () => {
            expect(container.a).toBe(1);
            expect(container.b).toBe(2);
            expect(typeof container.c).toBe('function');
            expect(container.c()).toBe(3);
        });

        it('overwrites values which have the same names', () => {
            expect(container.d).toBe(5);
            expect(container.e).toBe(6);
        });
    });

    describe('when called with services', () => {
        let container: Record<string, unknown>;
        let spies: Record<string, jest.Mock>;

        beforeEach(() => {
            const wrap = <T>(v: T) => Object.assign(v, { [exports.injectee]: v });
            spies = {};
            spies.a1 = wrap(jest.fn(() => ({ a: 1 })));
            spies.b1 = wrap(jest.fn(({ a }) => ({ b: a })));
            spies.c1 = wrap(jest.fn(({ d }) => ({ c: d })));
            spies.c2 = wrap(jest.fn(({ b }) => ({ c: b + 1 })));
            spies.d1 = wrap(jest.fn(({ c }) => ({ d: c })));
            spies.d2 = wrap(jest.fn(({ d }) => ({ d: d + 1 })));
            container = exports.container(
                { a: spies.a1 },
                { b: spies.b1, c: spies.c1 },
                { d: spies.d1 },
                { c: spies.c2, d: spies.d2 },
            );
        });

        it('produces a service lazily', () => {
            expect(spies.a1).not.toHaveBeenCalled();
            const { a } = container;
            expect(spies.a1).toHaveBeenCalledTimes(1);
            expect(spies.a1).toHaveReturnedWith(a);
        });

        it('produces a service with dependency', () => {
            const { a } = container;
            expect(spies.a1).toHaveBeenCalledTimes(1);
            expect(spies.b1).not.toHaveBeenCalled();
            expect(spies.a1).toHaveReturnedWith(a);
            const { b } = container;
            expect(spies.a1).toHaveBeenCalledTimes(1);
            expect(spies.b1).toHaveBeenCalledTimes(1);
            expect(spies.b1).toHaveReturnedWith(b);
        });

        it('overwrites services which have the same names', () => {
            expect(spies.a1).not.toHaveBeenCalled();
            expect(spies.b1).not.toHaveBeenCalled();
            expect(spies.c1).not.toHaveBeenCalled();
            expect(spies.c2).not.toHaveBeenCalled();
            const { c } = container;
            expect(spies.a1).toHaveBeenCalledTimes(1);
            expect(spies.b1).toHaveBeenCalledTimes(1);
            expect(spies.c1).not.toHaveBeenCalled();
            expect(spies.c2).toHaveBeenCalledTimes(1);
            expect(spies.c2).toHaveReturnedWith(c);
        });

        it('resolves services even which has the same names', () => {
            expect(spies.a1).not.toHaveBeenCalled();
            expect(spies.b1).not.toHaveBeenCalled();
            expect(spies.c1).not.toHaveBeenCalled();
            expect(spies.c2).not.toHaveBeenCalled();
            expect(spies.d1).not.toHaveBeenCalled();
            expect(spies.d2).not.toHaveBeenCalled();
            const { d } = container;
            expect(spies.a1).toHaveBeenCalledTimes(1);
            expect(spies.b1).toHaveBeenCalledTimes(1);
            expect(spies.c1).not.toHaveBeenCalled();
            expect(spies.c2).toHaveBeenCalledTimes(1);
            expect(spies.d1).toHaveBeenCalledTimes(1);
            expect(spies.d2).toHaveBeenCalledTimes(1);
            expect(spies.d2).toHaveReturnedWith(d);
            expect(spies.d1.mock.results[0]).toEqual({
                type: 'return',
                value: spies.d2.mock.calls[0][0].d,
            });
            expect(spies.d1.mock.calls[0][0].d).toBeUndefined();
            expect(spies.c2.mock.results[0]).toEqual({
                type: 'return',
                value: spies.d1.mock.calls[0][0].c,
            });
        });
    });
});
