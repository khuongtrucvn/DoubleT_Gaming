const Category = require('../models/theloai');
const Product = require('../models/sanpham');
const Cart = require('../models/giohang');
const Sequelize = require('sequelize');

exports.danhsach = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();
    const user = req.user;

    //usual data
    const carts = await Cart.findAll({raw:true, where:{uid:req.params.id},
        attributes: {
            include: [[Sequelize.literal('Product.name'), 'pname'],[Sequelize.literal('Product.avatar'), 'url'],[Sequelize.literal('Product.price'), 'price']]
        },
        include: [{ model: Product, attributes: [] }]});
    res.render('gio-hang/danh-sach', {title: 'Giỏ hàng', categories, logined, user, carts});
};
