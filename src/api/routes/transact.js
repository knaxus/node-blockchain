const { Router } = require('express');
const { transactionPool, wallet } = require('../globals');

const generateTransactionRoute = Router().post('/', (req, res) => {
  const { amount, recepient } = req.body;
  const transaction = wallet.createTransaction({ amount, recepient });
  transactionPool.setTransaction(transaction);
  console.log('Transaction Pool: ', transactionPool);

  res.json({
    data: transaction,
    msg: 'new transaction created',
  });
});

module.exports = generateTransactionRoute;
