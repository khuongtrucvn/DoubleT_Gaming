var express = require('express');
var router = express.Router();
var giohangController = require('../controllers/giohangController');

router.get('/:id', giohangController.danhsach);

module.exports = router;
