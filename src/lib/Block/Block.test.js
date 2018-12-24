const Block = require('./Block');

describe('Tests for Block', () => {
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

  it('should have timestamp, lastHash, hash and data fields', () => {
    expect(block.timestamp).toEqual(timestamp);
    expect(block.lastHash).toEqual(lastHash);
    expect(block.hash).toEqual(hash);
    expect(block.data).toEqual(data);
  });
});
