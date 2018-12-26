const uuid = require('uuid/v1');

class Transaction {
  constructor({ senderWallet, recepient, amount }) {
    this.id = uuid();
    this.outputMap = this.createOutputMap({ senderWallet, recepient, amount });
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
  }

  // eslint-disable-next-line class-methods-use-this
  createOutputMap({ senderWallet, recepient, amount }) {
    const outputMap = {};
    outputMap[recepient] = amount;
    outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
    return outputMap;
  }

  // eslint-disable-next-line class-methods-use-this
  createInput({ senderWallet, outputMap }) {
    return {
      timestamp: Date.now(),
      amount: senderWallet.balance,
      address: senderWallet.publicKey,
      signature: senderWallet.sign(outputMap),
    };
  }
}

module.exports = Transaction;
