const { Router } = require('express');
const { transactionPool } = require('../globals');

const getTransactionPool = Router().get('/', (req, res) => res.status(200).json({
  status: 'success',
  data: {
    pool: transactionPool.transactionMap,
  },
  msg: 'fetched transaction pool',
}));

module.exports = getTransactionPool;
