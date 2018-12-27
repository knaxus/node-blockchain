const uuid = require('uuid/v1');
const { verifySignature } = require('../../util');

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

  update({ senderWallet, recepient, amount }) {
    if (amount > this.outputMap[senderWallet.publicKey]) {
      throw new Error('Amount exceeds the balance');
    }
    this.outputMap[recepient] = amount;
    this.outputMap[senderWallet.publicKey] = this.outputMap[senderWallet.publicKey] - amount;
    this.input = this.createInput({ senderWallet, outputMap: this.outputMap });
  }

  static isValidTransaction(transaction) {
    const {
      input: { address, amount, signature },
      outputMap,
    } = transaction;

    const outputTotal = Object.values(outputMap).reduce(
      (total, outputAmount) => total + outputAmount,
    );
    if (outputTotal !== amount) {
      return false;
    }

    if (
      !verifySignature({
        publicKey: address,
        data: outputMap,
        signature,
      })
    ) {
      return false;
    }

    return true;
  }
}

module.exports = Transaction;
