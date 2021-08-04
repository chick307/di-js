// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import assert from 'assert';

import defaultExports, * as exports from '../src/di';

describe('injectee symbol', () => {
    it('is exported', () => {
        assert(typeof defaultExports.injectee === 'symbol');
        assert(typeof exports.injectee === 'symbol');
        assert(defaultExports.injectee === exports.injectee);
    });
});
