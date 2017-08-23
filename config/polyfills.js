if (typeof Promise === 'undefined') {
  // Rejection tracking prevents a common issue where React gets into an
  // inconsistent state due to an error, but it gets swallowed by a Promise,
  // and the user has no idea what causes React's erratic future behavior.
  // https://github.com/then/promise
  require('promise/lib/rejection-tracking').enable();
  window.Promise = require('promise/lib/es6-extensions.js');
}

// fetch() polyfill for making API calls.
require('whatwg-fetch');

// Object.assign() is commonly used with React.
// It will use the native implementation if it's present and isn't buggy.
Object.assign = require('object-assign');

// you can add other api in that place

// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (Array.prototype.find === 'undefined') {
  Object.defineProperty(Array.prototype, 'find', {
    value: (predicate) => {
      if (this === null) {
        throw new TypeError('"this" is null or not defined');
      }

      const o = Object(this);
      const len = o.length >>> 0;

      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      const thisArg = arguments[1];
      const k = 0;
      while(k < len) {
        const kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return kValue;
        }

        K++;
      }

      return undefined;
    },
  });
}
