const Blockchain = require('../lib/Blockchain');
const PubSub = require('../lib/PubSub');
const Wallet = require('../lib/Wallet');
const TransactionPool = require('../lib/TransactionPool');

const blockchain = new Blockchain();
const wallet = new Wallet();
const transactionPool = new TransactionPool();
const pubsub = new PubSub({ blockchain, transactionPool });

module.exports = {
  blockchain,
  pubsub,
  wallet,
  transactionPool,
};
