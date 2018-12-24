const { GENESIS_DATA } = require('../constants');
const cryptoHash = require('../hash');

class Block {
  constructor({
    timestamp, lastHash, hash, data,
  }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  /**
   * genesis() is a factory method. Factory methods refers to
   * any function that creates instance of a class without
   * directly using the constructor method
   */

  static genesis() {
    // return new Block(GENESIS_DATA);
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;

    return new this({
      timestamp,
      lastHash,
      hash: cryptoHash(timestamp, lastHash, data),
      data,
    });
  }
}

module.exports = Block;
