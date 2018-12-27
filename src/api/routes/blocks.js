const { Router } = require('express');
const { blockchain } = require('../globals');

const getBlocksRoute = Router().get('/', (req, res) => res.status(200).json({
  status: 'successful',
  data: blockchain.chain,
  msg: 'Fetched all the blocks',
}));

module.exports = getBlocksRoute;
