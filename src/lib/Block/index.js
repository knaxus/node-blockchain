const { GENESIS_DATA } = require('../constants');
const cryptoHash = require('../hash');

class Block {
  constructor({
    timestamp, lastHash, hash, data, nonce, difficulty,
  }) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
    this.nonce = nonce;
    this.difficulty = difficulty;
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
    let timestamp;
    let hash;
    const lastHash = lastBlock.hash;
    const { difficulty } = lastBlock;
    let nonce = 0;

    do {
      nonce += 1;
      timestamp = Date.now();
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty,
    });
  }
}

module.exports = Block;
