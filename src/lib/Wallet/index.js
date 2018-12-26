const { STARTING_BALANCE } = require('../constants');
const cryptoHash = require('../hash');
const { ec } = require('../../util');

class Wallet {
  constructor() {
    this.keyPair = ec.genKeyPair();
    this.balance = STARTING_BALANCE;
    this.publicKey = this.keyPair.getPublic();
  }

  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }
}

module.exports = Wallet;
