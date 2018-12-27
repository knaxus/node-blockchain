const TransactionPool = require('.');
const Transaction = require('../Transaction');
const Wallet = require('../Wallet');

describe('Transaction Pool', () => {
  let transactionPool;
  let transaction;

  beforeEach(() => {
    transaction = new Transaction({
      senderWallet: new Wallet(),
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
});
