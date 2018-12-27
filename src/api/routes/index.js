const { Router } = require('express');
const getBlocks = require('./blocks');
const mineBlock = require('./mine');
const generateTransaction = require('./transact');

const routes = Router();

routes.use('/blocks', getBlocks);
routes.use('/blocks/mine', mineBlock);
routes.use('/transact', generateTransaction);

module.exports = routes;
