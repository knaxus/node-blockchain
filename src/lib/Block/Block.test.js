const Block = require('.');
const { GENESIS_DATA } = require('../constants');
const cryptoHash = require('../hash');

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

describe('Mine Block', () => {
  const lastBlock = Block.genesis();
  const data = 'sample mined data';
  const minedBlock = Block.mineBlock({ lastBlock, data });

  it('Should be a Block instance', () => {
    expect(minedBlock instanceof Block).toBe(true);
  });

  it("Should set the 'lastHash' equal to the hash of the 'lastBlock'", () => {
    expect(minedBlock.lastHash).toEqual(lastBlock.hash);
  });

  it('Should set the timestamp', () => {
    expect(minedBlock.timestamp).not.toEqual(undefined);
  });

  it('Should set the data as given data', () => {
    expect(minedBlock.data).toEqual(data);
  });

  it('Should create a SHA-256 hash based on all the inputs', () => {
    expect(minedBlock.hash).toEqual(
      cryptoHash(minedBlock.timestamp, minedBlock.lastHash, minedBlock.data),
    );
  });
});
