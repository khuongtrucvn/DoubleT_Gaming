var express = require('express');
var router = express.Router();
var sanphamController = require('../controllers/sanphamController');

router.get('/', sanphamController.danhsach);

router.get('/id=:id', sanphamController.chitiet);

router.post('/binh-luan/:id', sanphamController.binhluan_post);

router.post('/tim-kiem/', sanphamController.timkiem_post);

router.get('/tim-kiem/key=:id', sanphamController.timkiem);

router.post('/sap-xep/', sanphamController.sapxep_post);

router.get('/sap-xep/filter=:id', sanphamController.sapxep);

module.exports = router;
