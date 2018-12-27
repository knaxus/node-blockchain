const { Router } = require('express');
const { transactionPool, wallet } = require('../globals');

const generateTransactionRoute = Router().post('/', (req, res) => {
  const { amount, recepient } = req.body;
  try {
    const transaction = wallet.createTransaction({ amount, recepient });
    transactionPool.setTransaction(transaction);
    console.log('Transaction Pool: ', transactionPool);
    return res.status(201).json({
      status: 'success',
      data: transaction,
      msg: 'new transaction created',
    });
  } catch (e) {
    return res.status(500).json({
      status: 'failed',
      data: {},
      msg: e.message,
    });
  }
});

module.exports = generateTransactionRoute;
