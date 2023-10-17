const express = require('express');
const { mypageControllers } = require('../controllers');

const router = express.Router();

router.get('/', mypageControllers);
router.patch('/', mypageControllers);
