var express = require('express');
var router = express.Router();
var trangchuController = require('../controllers/trangchuController');

router.get('/', trangchuController.home);

router.get('/dang-xuat', trangchuController.dangxuat);

module.exports = router;
