const Block = require('.');
const { GENESIS_DATA, MINE_RATE } = require('../constants');
const cryptoHash = require('../hash');

describe('Block', () => {
  const timestamp = +new Date();
  const lastHash = '32321321asdadaseqqw24fsf';
  const hash = '43eaë32rrewrwerwerdasdasdsa';
  const data = 'secure-transaction data';
  const nonce = 1;
  const difficulty = 1;
  const block = new Block({
    timestamp,
    lastHash,
    hash,
    data,
    nonce,
    difficulty,
  });

  it('Should have all the block fields', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
    expect(block.nonce).toEqual(nonce);
    expect(block.difficulty).toEqual(difficulty);
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
        cryptoHash(
          minedBlock.timestamp,
          minedBlock.lastHash,
          minedBlock.data,
          minedBlock.nonce,
          minedBlock.difficulty,
        ),
      );
    });

    it('Should create a `hash` that matches the difficulty criteria', () => {
      expect(minedBlock.hash.substring(0, minedBlock.difficulty)).toEqual(
        '0'.repeat(minedBlock.difficulty),
      );
    });
  });

  describe('adjustDifficulty()', () => {
    it('Should raise the difficulty for a quickly mined block', () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE - 100,
        }),
      ).toEqual(block.difficulty + 1);
    });

    it('Should lower the difficulty for a slowly mined block', () => {
      expect(
        Block.adjustDifficulty({
          originalBlock: block,
          timestamp: block.timestamp + MINE_RATE + 100,
        }),
      ).toEqual(block.difficulty - 1);
    });

    it('Should have a lower limit of 1', () => {
      block.difficulty = -1;
      expect(Block.adjustDifficulty({ originalBlock: block })).toEqual(1);
    });
  });
});
