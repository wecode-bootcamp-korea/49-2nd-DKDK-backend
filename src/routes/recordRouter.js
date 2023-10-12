const { throwError } = require('../utils');
const { request } = require('http');    
const express = require('express');
const recordController = require('../controllers/recordController');

const router = express.Router(); //라우터를 시작합니다.

const createRecord = recordController.createRecord;
const readRecord = recordController.readRecord;

router.post('/createRecord', recordContoller.createRecord);
router.get('/readRecord', recordController.readRecord);

module.exports = router;