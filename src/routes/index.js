const express = require('express');
const router = express.Router();
const recordRouter = require('./recordRouter');

router.use('/records', recordRouter);

module.exports = router;
