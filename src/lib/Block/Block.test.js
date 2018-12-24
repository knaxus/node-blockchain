const Block = require('./Block');
const { GENESIS_DATA } = require('../constants');

describe('Block', () => {
  const timestamp = +new Date();
  const lastHash = '32321321asdadaseqqw24fsf';
  const hash = '43eaë32rrewrwerwerdasdasdsa';
  const data = 'secure-transaction data';
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
  });

  it('Should have timestamp, lastHash, hash and data fields', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});

describe('Genesis Block', () => {
  const genesisBlock = Block.genesis();

  it('Should be a Block instance', () => {
    expect(genesisBlock instanceof Block).toBe(true);
  });

  it('Should return the Genesis Data', () => {
    expect(genesisBlock).toEqual(GENESIS_DATA);
  });
});
