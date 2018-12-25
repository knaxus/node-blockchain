const redis = require('redis');
const { CHANNELS, EVENTS } = require('../constants');

class PubSub {
  constructor({ blockchain }) {
    this.blockchain = blockchain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriberToChannels(Object.values(CHANNELS));
    this.subscriber.on(EVENTS.MESSAGE, this.handleMessage);
  }

  handleMessage(channel, message) {
    console.log(`Message Received: ${message} for Channel: ${channel}`);

    if (channel === CHANNELS.BLOCKCHAIN) {
      const parsedMessage = JSON.parse(message);
      this.blockchain.replaceChain(parsedMessage);
    }
  }

  subscriberToChannels(...channels) {
    channels.forEach(channel => this.subscriber.subscribe(channel));
  }

  publish({ channel, message }) {
    this.publisher.publish(channel, message);
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }
}

const dummy = new PubSub();
setTimeout(() => dummy.publisher.publish(CHANNELS.TEST, 'dummy message'), 1500);

module.exports = PubSub;
