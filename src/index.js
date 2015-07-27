const debug = require('./debug')('promise-async-cache');

/**
 * Simple lib to cache data through async load process.
 */
export default class PromiseAsyncCache {
  /**
   * @param  {Function} options.load loads the data into the cache
   */
  constructor ({ load }) {
    if (!load) { throw new Error('"load" is a required argument'); }
    this.load = load;
    this.cache = {};
    this.loading = {};
  }

  /**
   * Gets the data from the cache.
   * - In case the data does not exist yet it will also cache the data.
   * - Multiple calls at the same to the same key will be included
   * in a waiting list until the firs call has been completed.
   *
   * @param  key
   * @return {Promise}
   */
  get (key) {
    return new Promise((resolve, reject) => {
      const result = this.cache[key];
      if (result) {
        debug('getting data with key "%s" from cache', key);
        resolve(result);
        return;
      }

      let promises = this.loading[key];
      if (!promises) { promises = this.loading[key] = []; }

      promises.push({ resolve: resolve, reject: reject });

      if (promises.length > 1) {
        debug('the data with key "%s" has been loaded by another call', key);
        return;
      }

      debug('loading data into the cache "%s"', key);
      return this.load.apply(this, arguments).then((value) => {
        this.cache[key] = value;
        promises.forEach(p => p.resolve(value));
        delete this.loading[key];
      }).catch(err => {
        promises.forEach(p => p.reject(err));
        delete this.loading[key];
        debug('Error on loading data into the cache', err, err.stack);
      });
    });
  }
}
