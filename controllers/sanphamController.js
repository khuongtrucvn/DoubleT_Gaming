const Product = require('../models/sanpham');
const Category = require('../models/theloai');
const Publisher = require('../models/nhaphathanh');
const Sequelize = require('sequelize');

exports.danhsach = async (req, res) => {
    const categories = await Category.findAll({raw:true});
    const publishers = await Publisher.findAll({raw:true, limit:10});
    const products = await Product.findAll({raw:true,limit:12 ,order:Sequelize.fn('RAND')});

    res.render('san-pham/danh-sach', { title: 'Danh sách sản phẩm', categories, publishers, products});
};