var express = require('express');
var router = express.Router();
var passport = require('passport');
var nguoidungController = require('../controllers/nguoidungController');

router.get('/dang-nhap-dang-ki',nguoidungController.index);

router.post('/dang-nhap',
    passport.authenticate('local',{
      successRedirect: '/',
      failureRedirect: '/nguoi-dung/dang-nhap-dang-ki/'})
);

module.exports = router;
