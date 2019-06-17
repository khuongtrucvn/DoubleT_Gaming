var express = require('express');
var router = express.Router();
var sanphamController = require('../controllers/sanphamController');

router.get('/', sanphamController.danhsach);
router.get('/id=:id', sanphamController.chitiet);

module.exports = router;
