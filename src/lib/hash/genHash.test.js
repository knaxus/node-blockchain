const cryptoHash = require('.');

describe('Generate Crypto Hash', () => {
  const hash = 'b2213295d564916f89a6a42455567c87c3f480fcd7a1c15e220f17d7169a790b';

  it('Should generate a SHA-256 hex', () => {
    expect(cryptoHash('foo')).toEqual(hash);
  });

  it('Should generate same hex for same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('two', 'one', 'three'));
  });

  it('Should create unique hash when the properties of input has changed', () => {
    const foo = {};
    const originalHash = cryptoHash(foo);

    foo.a = 'A';
    const newHash = cryptoHash(foo);

    expect(newHash).not.toEqual(originalHash);
  });
});
