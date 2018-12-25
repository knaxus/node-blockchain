const Block = require('../Block');
const cryptoHash = require('../hash');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const lastBlock = this.chain[this.chain.length - 1];
    const newBlock = Block.mineBlock({ lastBlock, data });
    this.chain.push(newBlock);
  }

  static isValidChain(chain) {
    // check the first block of the chain is the genesis block
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i += 1) {
      const block = chain[i];
      const actualLastHash = chain[i - 1].hash;
      const lastDifficulty = chain[i - 1].difficulty;

      const {
        timestamp, lastHash, hash, data, nonce, difficulty,
      } = block;

      // if any of the lash hash is tapered with return false
      if (lastHash !== actualLastHash) {
        return false;
      }

      if (lastDifficulty - difficulty > 1) {
        return false;
      }

      const validateHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);
      // check if the hash of the block is correct
      if (hash !== validateHash) {
        return false;
      }
    }
    return true;
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) {
      return this.chain;
    }

    if (!Blockchain.isValidChain(chain)) {
      return this.chain;
    }

    this.chain = chain;
    return this.chain;
  }
}

module.exports = Blockchain;
