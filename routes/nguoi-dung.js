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

router.get('/thong-tin',nguoidungController.thongtin);

router.post('/chinh-sua',nguoidungController.chinhsua_post);

router.post('/doi-mat-khau',nguoidungController.doimatkhau_post);

router.post('/dang-ki',nguoidungController.dangki_post);

module.exports = router;
