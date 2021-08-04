// (C) 2015 chick307 <chick307@gmail.com>
// Licensed under the MIT License. http://chick307.mit-license.org/

import { injectee } from './symbols';
export { injectee };

import { factory, service } from './injectee';
export { factory, service };

import { container } from './container';
export { container };

export default {
    container,
    factory,
    injectee,
    service,
};
