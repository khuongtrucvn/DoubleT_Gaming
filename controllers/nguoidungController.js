const Product = require('../models/sanpham');
const Category = require('../models/theloai');
const Publisher = require('../models/nhaphathanh');
const Sequelize = require('sequelize');

exports.index = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();

    res.render('nguoi-dung/dang-nhap-dang-ki', {title: 'Đăng nhập - Đăng kí', categories, logined});
};

