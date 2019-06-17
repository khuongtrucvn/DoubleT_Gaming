var express = require('express');
var router = express.Router();
var theloaiController = require('../controllers/theloaiController');

router.get('/cid=:id', theloaiController.phanloai_sanpham);

module.exports = router;
