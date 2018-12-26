const Wallet = require('.');
const { verifySignature } = require('../../util');

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

  describe('Sigining data', () => {
    const data = 'foo-bar';

    it('Should verify a valid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: wallet.sign(data),
        }),
      ).toBe(true);
    });

    it('Should not verify invalid signature', () => {
      expect(
        verifySignature({
          publicKey: wallet.publicKey,
          data,
          signature: new Wallet().sign(data),
        }),
      ).toBe(false);
    });
  });
});
