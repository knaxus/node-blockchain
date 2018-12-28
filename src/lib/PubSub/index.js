const redis = require('redis');
const { CHANNELS, EVENTS } = require('../constants');

class PubSub {
  constructor({ blockchain, transactionPool }) {
    // console.log('inside construct of pubsub: ', { blockchain });
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriberToChannels(Object.values(CHANNELS));
    this.subscriber.on(EVENTS.MESSAGE, (channel, message) => this.handleMessage(channel, message));
  }

  handleMessage(channel, message) {
    console.log(`Message Received: \n${message} for \n\nChannel: ${channel}\n\n`);

    const parsedMessage = JSON.parse(message);

    switch (channel) {
      case CHANNELS.BLOCKCHAIN:
        this.blockchain.replaceChain(parsedMessage);
        break;

      case CHANNELS.TRANSACTION:
        this.transactionPool.setTransaction(parsedMessage);
        break;

      default:
        return null;
    }
    return null;
  }

  subscriberToChannels(...channels) {
    channels.forEach(channel => this.subscriber.subscribe(channel));
  }

  publish({ channel, message }) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }
}

module.exports = PubSub;
