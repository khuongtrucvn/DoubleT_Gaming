var express = require('express');
var router = express.Router();
var nhaphathanhController = require('../controllers/nhaphathanhController');

router.get('/pbid=:id', nhaphathanhController.phanloai_sanpham);

module.exports = router;