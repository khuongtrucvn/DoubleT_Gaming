const Product = require('../models/sanpham');
const Category = require('../models/theloai');
const Publisher = require('../models/nhaphathanh');
const Sequelize = require('sequelize');

exports.phanloai_sanpham = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();
    const user = req.user;

    //usual data
    const publishers = await Publisher.findAll({raw:true, limit:10, order:Sequelize.fn( 'RAND' )});
    const products = await Product.findAll({raw:true, limit:12, where:{pbid:req.params.id}, order:[[Sequelize.col('pid'),'DESC']]});

    res.render('nha-phat-hanh/danh-sach', {title: 'Nhà phát hành', categories, logined, user, publishers, products});
};