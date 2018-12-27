const Blockchain = require('../lib/Blockchain');
const PubSub = require('../lib/PubSub');
const Wallet = require('../lib/Wallet');
const TransactionPool = require('../lib/TransactionPool');

const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });
const wallet = new Wallet();
const transactionPool = new TransactionPool();

module.exports = {
  blockchain,
  pubsub,
  wallet,
  transactionPool,
};
