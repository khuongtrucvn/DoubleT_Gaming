const Product = require('../models/sanpham');
const Category = require('../models/theloai');
const Publisher = require('../models/nhaphathanh');
const Sequelize = require('sequelize');

exports.index = async (req, res) => {
    const categories = await Category.findAll({raw:true});
    res.render('nguoi-dung/dang-nhap-dang-ki', {title: 'Đăng nhập - Đăng kí', categories});
};

