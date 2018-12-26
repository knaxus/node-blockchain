const Blockchain = require('../lib/Blockchain');
const PubSub = require('../lib/PubSub');

const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });

module.exports = {
  blockchain,
  pubsub,
};
