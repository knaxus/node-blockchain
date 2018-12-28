const express = require('express');
const request = require('request');
const routes = require('./routes');
const { blockchain, transactionPool } = require('./globals');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', routes);

const DEFAULT_PORT = process.env.PORT || 3000;
const ROOT_NODE_ADDRESS = process.env.ROOT_NODE_ADDRESS || `http://localhost:${DEFAULT_PORT}`;
let PEER_PORT = null;

if (process.env.GENERATE_PEER_PORT) {
  PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
} else {
  PEER_PORT = DEFAULT_PORT;
}

const syncWithRootNode = () => {
  request(
    {
      url: `${ROOT_NODE_ADDRESS}/api/blocks`,
      method: 'GET',
    },
    (error, response, body) => {
      if (error) {
        console.error('Failed to update chain. Exiting..');
        process.exit(-1);
      } else if (!error && response.statusCode === 200) {
        // console.log('data from root node: ', body);
        const rootChain = JSON.parse(body);
        blockchain.replaceChain(rootChain.data.chain);
        // console.log('Updated chain: ', JSON.stringify(blockchain.chain));
      }
    },
  );

  request(
    {
      url: `${ROOT_NODE_ADDRESS}/api/transactions/pool`,
      method: 'GET',
    },
    (error, response, body) => {
      if (error) {
        console.error('Failed to update transaction map. Exiting..');
        process.exit(-1);
      } else if (!error && response.statusCode === 200) {
        // console.log('data from root node: ', body);
        const rootTransactionMap = JSON.parse(body);
        transactionPool.setMap(rootTransactionMap.data.pool);
        // console.log('Updated chain: ', JSON.stringify(blockchain.chain));
      }
    },
  );
};

const PORT = PEER_PORT || DEFAULT_PORT;
app.listen(PORT, () => {
  console.log(`server started at: http://localhost:${PORT}`);
  if (PORT !== DEFAULT_PORT) {
    syncWithRootNode();
  }
});
