const cryptoHash = require('./index');

describe('Generate Crypto Hash', () => {
  const hash = '2c26b46b68ffc68ff99b453c1d30413413422d706483bfa0f98a5e886266e7ae';

  it('Should generate a SHA-256 hex', () => {
    expect(cryptoHash('foo')).toEqual(hash);
  });

  it('Should generate same hex for same input arguments in any order', () => {
    expect(cryptoHash('one', 'two', 'three')).toEqual(cryptoHash('two', 'one', 'three'));
  });
});
