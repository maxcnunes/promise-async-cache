import { expect } from 'chai';
import PromiseAsyncCache from '../src';


describe('promise-async-cache', function () {
  this.timeout(20000);

  beforeEach(function () {
    this.cache = new PromiseAsyncCache({
      load (key, multiply=2) {
        return new Promise((resolve) => {
          setTimeout(() => resolve(key * multiply), 2000);
        });
      }
    });
  });

  it('should cache the value', async function () {
    const value = await this.cache.get(1);
    expect(value).to.eql(2);
    expect(Object.keys(this.cache.cache)).to.have.length(1);
  });

  it('should load the data into the cache only once for each key even with multiple calls at same time', async function () {
    const [res1, res2, res3, res4] = await Promise.all([
      this.cache.get(1, 10),
      this.cache.get(1, 20),
      this.cache.get(2, 30),
      this.cache.get(1, 40)
    ]);

    expect(Object.keys(this.cache.cache)).to.have.length(2);
    expect(res1).to.eql(10);
    expect(res2).to.eql(10);
    expect(res3).to.eql(60);
    expect(res4).to.eql(10);
  });
});
