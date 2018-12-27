const crypto = require('crypto');

const generateCryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');
  hash.update(
    inputs
      .map(input => JSON.stringify(input))
      .sort()
      .join(' '),
  ); // to make the hash multiple arguments equal regardless of argument order
  return hash.digest('hex');
};

module.exports = generateCryptoHash;
