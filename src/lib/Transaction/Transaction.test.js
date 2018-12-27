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
    recepient = 'random-recepient';
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

  describe('Transaction.isValidTransaction()', () => {
    describe('When the transaction is valid', () => {
      it('Should return true for a valid transaction', () => {
        expect(Transaction.isValidTransaction(transaction)).toBe(true);
      });
    });

    describe('When the transaction is invalid', () => {
      it('Should return false if the transaction `outputMap` is invalid', () => {
        // Tamper with the recepient
        transaction.outputMap[senderWallet.publicKey] = 'random-garbage-value';
        expect(Transaction.isValidTransaction(transaction)).toBe(false);
      });

      it('Should return false if the transaction `input` signature is invalid', () => {
        transaction.input.signature = new Wallet().sign('random-data');
        expect(Transaction.isValidTransaction(transaction)).toBe(false);
      });
    });
  });

  describe('update()', () => {
    let originalSignature;
    let originalSenderOutput;
    let nextRecepient;
    let nextAmount;

    describe('Whhen amount is invalid', () => {
      it('Should throw an error', () => {
        expect(() => {
          transaction.update({
            senderWallet,
            recepient,
            amount: 999999,
          });
        }).toThrow('Amount exceeds the balance');
      });
    });

    describe('When amount is valid', () => {
      beforeEach(() => {
        originalSignature = transaction.input.signature;
        originalSenderOutput = transaction.outputMap[senderWallet.publicKey];
        nextRecepient = 'next-recepient';
        nextAmount = 50;

        transaction.update({
          senderWallet,
          recepient: nextRecepient,
          amount: nextAmount,
        });
      });

      it('Should output the amount to the next recepient', () => {
        expect(transaction.outputMap[nextRecepient]).toEqual(nextAmount);
      });

      it('Should subtract the amount from the original sender output amount', () => {
        expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
          originalSenderOutput - nextAmount,
        );
      });

      it('Should maintain a total output that matches the input amount', () => {
        expect(
          Object.values(transaction.outputMap).reduce(
            (total, outputAmount) => total + outputAmount,
          ),
        ).toEqual(transaction.input.amount);
      });

      it('Should re-sign the transaction', () => {
        expect(transaction.input.signature).not.toEqual(originalSignature);
      });

      describe('Another update for the same recepient', () => {
        let addedAmount;

        beforeEach(() => {
          addedAmount = 80;
          transaction.update({
            senderWallet,
            recepient: nextRecepient,
            amount: addedAmount,
          });
        });

        it('Should add to the recepient amount', () => {
          expect(transaction.outputMap[nextRecepient]).toEqual(nextAmount + addedAmount);
        });

        it('Should subtract the amount from the original sender output amount', () => {
          expect(transaction.outputMap[senderWallet.publicKey]).toEqual(
            originalSenderOutput - nextAmount - addedAmount,
          );
        });
      });
    });
  });
});
