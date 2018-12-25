const Block = require('../Block');
const Blockchain = require('.');

let blockchain = new Blockchain();

beforeEach(() => {
  blockchain = new Blockchain();
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
  });
});
