const { STARTING_BALANCE } = require('../constants');
const { ec } = require('../../util');

class Wallet {
  constructor() {
    const keyPair = ec.genKeyPair();

    this.balance = STARTING_BALANCE;
    this.publicKey = keyPair.getPublic();
  }
}

module.exports = Wallet;
