# promise-async-cache

[![Build Status](https://travis-ci.org/maxcnunes/promise-async-cache.svg?branch=master)](https://travis-ci.org/maxcnunes/promise-async-cache)
[![npm version](https://badge.fury.io/js/promise-async-cache.svg)](http://badge.fury.io/js/promise-async-cache)

> Thanks [@esnunes](https://github.com/esnunes) for the initial implementation :)

## Installation

Install via npm:

```bash
$ npm install promise-async-cache
```

## Usage

```js
// the example uses es6 but it works with es5 as well
import PromiseAsyncCache from 'promise-async-cache';

// loading value into the cache
const cache = new PromiseAsyncCache({
  load (key) {
    // load async data
    // then return a promise with the value to be cached
  }
});

// getting value from the cache
cache.get(key).then(value => /* ... */);
```

### Extra arguments

Is possible passing extra arguments to the `load` function through the `get` function:

```js
const cache = new PromiseAsyncCache({
  load (key, myOtherObject) { /* ... */ }
});

cache.get(key, myOtherObject).then(value => /* ... */);
```

It is required to use [editorconfig](http://editorconfig.org/) and please write and run specs before pushing any changes:

```js
npm test
```

## License

Copyright (c) 2015 Max Claus Nunes. This software is licensed under the [MIT License](http://raw.github.com/maxcnunes/promise-async-cache/master/LICENSE).
