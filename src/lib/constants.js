const INITIAL_DIFFICULTY = 3;

const MINE_RATE = 1000;

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: '---',
  hash: '09090dasdasdas0fd90f9as0sdas',
  data: [],
  difficulty: INITIAL_DIFFICULTY,
  nonce: 0,
};

const CHANNELS = {
  TEST: 'test',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION',
};

const EVENTS = {
  MESSAGE: 'message', // Do not change the value it's used by PubSub.publish()
};

const STARTING_BALANCE = 1000;

module.exports = {
  GENESIS_DATA,
  INITIAL_DIFFICULTY,
  MINE_RATE,
  CHANNELS,
  EVENTS,
  STARTING_BALANCE,
};
