const Wallet = require('.');

describe('Wallet Class', () => {
  let wallet = null;

  beforeEach(() => {
    wallet = new Wallet();
  });

  it('Should have a `balance` property', () => {
    expect(wallet).toHaveProperty('balance');
  });

  it('Should have a `publicKey` property', () => {
    expect(wallet).toHaveProperty('publicKey');
  });
});
