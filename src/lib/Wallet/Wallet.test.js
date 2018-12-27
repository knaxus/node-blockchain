const Wallet = require('.');
const Transaction = require('../Transaction');
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

  describe('createTransaction()', () => {
    describe('If the amount exceeds the balance', () => {
      it('Should throw an error for if amount exceeds the balance', () => {
        expect(() => wallet.createTransaction({
          amount: 999999,
          recepient: 'dummy-recepient',
        })).toThrow('Amount exceeds the balance');
      });
    });

    describe('If the amount is valid', () => {
      let transaction; let amount; let
        recepient;

      beforeEach(() => {
        amount = 100;
        recepient = 'dummy-recepient';
        transaction = wallet.createTransaction({ amount, recepient });
      });

      it('Should create an instance of transaction', () => {
        expect(transaction instanceof Transaction).toBe(true);
      });

      it('Should match the transaction input with the wallet', () => {
        expect(transaction.input.address).toEqual(wallet.publicKey);
      });

      it('Should outputs the amount to the recepient', () => {
        expect(transaction.outputMap[recepient]).toEqual(amount);
      });
    });
  });
});
