var express = require('express');
var router = express.Router();
var donhangController = require('../controllers/donhangController');

router.get('/:id', donhangController.danhsach);


module.exports = router;
