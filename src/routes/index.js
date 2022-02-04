const express = require('express');
const router = express.Router();
const controller = require('../controller/loans-controller');

router.get('/', controller.getAllBorrowers);

module.exports = router;