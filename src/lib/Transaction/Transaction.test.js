const Wallet = require('../Wallet');
const Transaction = require('.');
const { verifySignature } = require('../../util');

describe('Transaction Class', () => {
  let transaction;
  let senderWallet;
  let recepient;
  let amount;

  beforeEach(() => {
    senderWallet = new Wallet();
    recepient = 'random-recepient-public-key';
    amount = 50;
    transaction = new Transaction({ senderWallet, recepient, amount });
  });

  it('Should has an `id` property', () => {
    expect(transaction).toHaveProperty('id');
  });

  describe('Transaction outputMap Property', () => {
    it('Should have an outputMap', () => {
      expect(transaction).toHaveProperty('outputMap');
    });

    it('Should output the amunt to the recepient', () => {
      expect(transaction.outputMap[recepient]).toEqual(amount);
    });

    it('Should output the remaining balance for the `senderWallet`', () => {
      expect(transaction.outputMap[senderWallet.publicKey]).toEqual(senderWallet.balance - amount);
    });
  });

  describe('Transaction Input Property', () => {
    it('Should have an `input` property', () => {
      expect(transaction).toHaveProperty('input');
    });

    it('Should have a `timestamp` inside the `input`', () => {
      expect(transaction.input).toHaveProperty('timestamp');
    });

    it('Should set the `amount` to the `senderWallet` balance', () => {
      expect(transaction.input.amount).toEqual(senderWallet.balance);
    });

    it('Should set the address to the `senderWallet` publicKey', () => {
      expect(transaction.input.address).toEqual(senderWallet.publicKey);
    });

    it('Should sign the input', () => {
      expect(
        verifySignature({
          publicKey: senderWallet.publicKey,
          data: transaction.outputMap,
          signature: transaction.input.signature,
        }),
      ).toBe(true);
    });
  });
});
