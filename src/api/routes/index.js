const { Router } = require('express');
const getBlocks = require('./blocks');
const mineBlock = require('./mine');
const generateTransaction = require('./transact');
const getTransactionPool = require('./getTransactionPool');

const routes = Router();

routes.use('/blocks', getBlocks);
routes.use('/blocks/mine', mineBlock);
routes.use('/transact', generateTransaction);
routes.use('/transactions/pool', getTransactionPool);

module.exports = routes;
