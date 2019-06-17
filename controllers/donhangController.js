const Category = require('../models/theloai');
const Product = require('../models/sanpham');
const Order = require('../models/donhang');
const Sequelize = require('sequelize');

exports.danhsach = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();
    const user = req.user;

    //usual data
    const orders = await Order.findAll({raw:true, where:{uid:req.params.id},
        attributes: {
            include: [[Sequelize.literal('Product.name'), 'pname']]
        },
        include: [{ model: Product, attributes: [] }]});
    res.render('don-hang/danh-sach', {title: 'Danh sách đơn hàng', categories, logined, user, orders});
};

exports.thanhtoan = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();
    const user = req.user;

    //usual data
    /*const carts = await Carts.findOne({where:{pid:req.params.id},
        attributes: {
            include: [[Sequelize.literal('Product.name'), 'pname'],[Sequelize.literal('Product.price'), 'price']]
        },
        include: [{ model: Product, attributes: [] }]});*/
    res.render('don-hang/thanh-toan', {title: 'Thanh toán', categories, logined, user});
};

exports.thanhtoan_post = async (req, res) => {};
