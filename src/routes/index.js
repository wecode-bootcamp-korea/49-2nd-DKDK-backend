const express = require('express');
// const app = express();
const routes = express.Router();
const recordRouter = require('./recordRouter');

routes.use('/records', recordRouter);

module.exports = { routes };