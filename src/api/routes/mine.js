const { Router } = require('express');
const { blockchain, pubsub } = require('../globals');

const mineBlockRoute = Router().post('/', (req, res) => {
  const { blockData: data } = req.body;
  blockchain.addBlock({ data });
  pubsub.broadcastChain();
  return res.status(201).json({
    status: 'successful',
    data: blockchain.chain[blockchain.chain.length - 1],
    msg: 'added to the block',
  });
});

module.exports = mineBlockRoute;
