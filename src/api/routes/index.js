const { Router } = require('express');
const getBlocks = require('./blocks');
const mineBlock = require('./mine');

const routes = Router();

routes.use('/blocks', getBlocks);
routes.use('/blocks/mine', mineBlock);

module.exports = routes;
