# di.js

Dependency injection for ES2015

## Installation

```sh
$ npm install @chick307/di
```

## Usage

```javascript
// a.js

export const a1 = 100;

export const a2 = 200;
```

```javascript
// b.js

import assert from 'assert';

import di from '@chick307/di';

export const b1 = di.factory(({ a1, a2 }) => `a1 = ${a1}, a2 = ${a2}`);
assert(b1({ a1: 1, a2: 2 }) === 'a1 = 1, a2 = 2');
assert(b1({ a1: 10, a2: 50 }) === 'a1 = 10, a2 = 50');

export const b2 = di.factory(({ a1, a2, c1 }) => `a1 + a2 + c1 = ${a1 + a2 + c1}`);
assert(b2({ a1: 1, a2: 2, c1: 3 }) === 'a1 + a2 + c1 = 6');
assert(b2({ a1: 10, a2: 50, c1: 100 }) === 'a1 + a2 + c1 = 160');
```

```javascript
// c.js

import assert from 'assert';

import di from '@chick307/di';

import * as a from './a';
import * as b from './b';

const container = di.container(a, b, { c1: 1000 });

assert(container.a1 === 100);
assert(container.a2 === 200); // 200
assert(container.b1 === 'a1 = 100, a2 = 200');
assert(container.b2 === 'a1 + a2 + c1 = 1300');
assert(container.c1 === 1000);

function func({ a1, b1 }) {
    //
}

func(container);
```

## License

The MIT License (MIT)
(C) 2015 chick307 <chick307@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
