const Transaction = require('../Transaction');
const { STARTING_BALANCE } = require('../constants');
const cryptoHash = require('../hash');
const { ec } = require('../../util');

class Wallet {
  constructor() {
    this.keyPair = ec.genKeyPair();
    this.balance = STARTING_BALANCE;
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(cryptoHash(data));
  }

  createTransaction({ amount, recepient }) {
    if (amount > this.balance) {
      throw new Error('Amount exceeds the balance');
    }

    return new Transaction({ senderWallet: this, recepient, amount });
  }
}

module.exports = Wallet;
