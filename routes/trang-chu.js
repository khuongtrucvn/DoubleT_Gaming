var express = require('express');
var router = express.Router();
var trangchuController = require('../controllers/trangchuController');

router.get('/', trangchuController.home);

module.exports = router;
