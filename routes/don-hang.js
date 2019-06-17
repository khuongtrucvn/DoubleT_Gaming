var express = require('express');
var router = express.Router();
var donhangController = require('../controllers/donhangController');

router.get('/:id', donhangController.danhsach);

router.get('/thanh-toan/:id', donhangController.thanhtoan);

router.post('/thanh-toan/:id', donhangController.thanhtoan_post);

module.exports = router;
