const hex2Binary = require('hex-to-binary');
const { GENESIS_DATA, MINE_RATE } = require('../constants');
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
    let { difficulty } = lastBlock;
    let nonce = 0;
    const lastHash = lastBlock.hash;

    do {
      nonce += 1;
      timestamp = Date.now();
      difficulty = Block.adjustDifficulty({ originalBlock: lastBlock, timestamp });
      hash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
    } while (hex2Binary(hash).substring(0, difficulty) !== '0'.repeat(difficulty));

    return new this({
      timestamp,
      lastHash,
      hash,
      data,
      nonce,
      difficulty,
    });
  }

  static adjustDifficulty({ originalBlock, timestamp }) {
    const { difficulty } = originalBlock;
    if (difficulty < 1) return 1;

    if (timestamp - originalBlock.timestamp > MINE_RATE) {
      return difficulty - 1;
    }
    return difficulty + 1;
  }
}

module.exports = Block;
