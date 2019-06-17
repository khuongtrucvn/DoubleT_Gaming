const Category = require('../models/theloai');
const User = require('../models/nguoidung');

exports.index = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();

    res.render('nguoi-dung/dang-nhap-dang-ki', {title: 'Đăng nhập - Đăng kí', categories, logined});
};

exports.thongtin = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();

    //usual data
    const user = req.user;

    console.log(user);
    res.render('nguoi-dung/chi-tiet', {title: 'Thông tin cá nhân', categories, logined, user});
};

exports.chinhsua_post = async (req, res) => {
    const nameText = await req.body.Name;
    const phoneText = await req.body.PhoneNumber;
    const addressText = await req.body.Address;

    const user = req.user;
    user.update({
        name:nameText,
        phonenumber:phoneText,
        address:addressText,
    });
    res.redirect('/nguoi-dung/thong-tin')
};


