const Block = require('../Block');
const Blockchain = require('.');

describe('Blockchain', () => {
  const blockchain = new Blockchain();

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
