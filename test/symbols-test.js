// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import defaultExports, * as exports from '../src/di';

describe('injectee symbol', () => {
    it('is exported', () => {
        expect(typeof defaultExports.injectee).toBe('symbol');
        expect(typeof exports.injectee).toBe('symbol');
        expect(defaultExports.injectee).toBe(exports.injectee);
    });
});
