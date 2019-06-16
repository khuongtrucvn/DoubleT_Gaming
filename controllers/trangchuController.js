const Product = require('../models/sanpham');
const Category = require('../models/theloai');
const Sequelize = require('sequelize');

exports.home = async (req, res) => {
    const categories = await Category.findAll({raw:true});
    const products = await Product.findAll({raw:true, limit:8, order:Sequelize.fn( 'RAND' )});
    const popular = await Product.findAll({raw:true, limit:8, order:Sequelize.fn( 'RAND' ) });
    const featured = await Product.findAll({raw:true, limit:8, order:Sequelize.fn( 'RAND' )});
    const latest = await Product.findAll({raw:true, limit:8, order:[[Sequelize.col('pid'),'DESC']]});

    res.render('trang-chu/trang-chu', { title: 'Trang chủ', products, categories, popular, featured, latest});
};