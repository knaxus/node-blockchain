const redis = require('redis');
const { CHANNELS, EVENTS } = require('../constants');

class PubSub {
  constructor({ blockchain }) {
    // console.log('inside construct of pubsub: ', { blockchain });
    this.blockchain = blockchain;
    this.publisher = redis.createClient();
    this.subscriber = redis.createClient();

    this.subscriberToChannels(Object.values(CHANNELS));
    this.subscriber.on(EVENTS.MESSAGE, (channel, message) => this.handleMessage(channel, message));
  }

  handleMessage(channel, message) {
    console.log(`Message Received: ${message} for Channel: ${channel}\n\n`);

    if (channel === CHANNELS.BLOCKCHAIN) {
      const parsedMessage = JSON.parse(message);
      this.blockchain.replaceChain(parsedMessage);
    }
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
}

module.exports = PubSub;
