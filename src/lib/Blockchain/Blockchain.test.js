const Blockchain = require('.');
const Block = require('../Block');
const cryptoHash = require('../hash');

let blockchain;
let newChain;
let originalChain;

beforeEach(() => {
  blockchain = new Blockchain();
  newChain = new Blockchain();
  originalChain = blockchain.chain;
});

describe('Blockchain', () => {
  it("Should contain a 'chain' Array instance", () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it('Should start with a Genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('Should add a new block to the chain', () => {
    const newData = 'dummy data';
    blockchain.addBlock({ data: newData });
    expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
  });

  describe('isValidChain()', () => {
    describe('When chain does not start with the Genesis Block', () => {
      it('Should return false', () => {
        blockchain.chain[0].data = 'random-data';
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    beforeEach(() => {
      blockchain.addBlock({ data: 'Foo' });
      blockchain.addBlock({ data: 'Bar' });
      blockchain.addBlock({ data: 'Foo Bar' });
      blockchain.addBlock({ data: 'Tampered' });
    });

    describe('When chain starts with Genesis Block and has multiple blocks', () => {
      it('Should return false if a lastHash reference is changed', () => {
        blockchain.chain[2].lastHash = 'broken-last-hash';
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });

      it('Should return false is the chain contains an invalid field', () => {
        blockchain.chain[2].data = 'broken-last-hash';
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });

      it('Should return true if the chain does not contain any invalid block', () => {
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
      });

      it('Should return false for a block with jumped difficulty', () => {
        const lastBlock = blockchain.chain[blockchain.chain.length - 1];
        const lastHash = lastBlock.hash;
        const timestamp = Date.now();
        const nonce = 0;
        const data = [];
        const difficulty = lastBlock.difficulty - 3;
        const hash = cryptoHash(timestamp, lastHash, nonce, difficulty, data);

        const badBlock = new Block({
          timestamp,
          lastHash,
          hash,
          data,
          difficulty,
          nonce,
        });

        blockchain.chain.push(badBlock);

        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });
  });

  describe('replaceChain()', () => {
    describe('When the chain is not longer', () => {
      it('Should not replace the chain', () => {
        newChain.chain[0] = { new: 'new chain' };
        blockchain.replaceChain(newChain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });
    });

    describe('When the chain is longer', () => {
      beforeEach(() => {
        newChain.addBlock({ data: 'Foo' });
        newChain.addBlock({ data: 'Bar' });
        newChain.addBlock({ data: 'Foo Bar' });
        newChain.addBlock({ data: 'Tampered' });
      });

      it('Should not replace if the chain is invalid', () => {
        newChain.chain[2].hash = 'damaged-hash';
        // since the hash is damaged, the chain should remain equal to the original chain
        blockchain.replaceChain(newChain.chain);
        expect(blockchain.chain).toEqual(originalChain);
      });

      it('Shouldreplace the chain if the incoming chain is valid', () => {
        blockchain.replaceChain(newChain.chain);
        expect(blockchain.chain).toEqual(newChain.chain);
      });
    });
  });
});
