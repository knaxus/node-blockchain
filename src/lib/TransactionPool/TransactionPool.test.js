const TransactionPool = require('.');
const Transaction = require('../Transaction');
const Wallet = require('../Wallet');

describe('Transaction Pool', () => {
  let transactionPool;
  let transaction;
  let senderWallet;

  beforeEach(() => {
    senderWallet = new Wallet();
    transaction = new Transaction({
      senderWallet,
      recepient: 'random-recepient',
      amount: 100,
    });

    transactionPool = new TransactionPool();
  });

  describe('setTransaction()', () => {
    it('Should add a transaction', () => {
      transactionPool.setTransaction(transaction);
      expect(transactionPool.transactionMap[transaction.id]).toBe(transaction);
    });
  });

  describe('existingTransaction()', () => {
    it('Should return exsiting transaction given an input address', () => {
      transactionPool.setTransaction(transaction);

      expect(transactionPool.existingTransaction({ inputAddress: senderWallet.publicKey })).toBe(
        transaction,
      );
    });
  });
});
