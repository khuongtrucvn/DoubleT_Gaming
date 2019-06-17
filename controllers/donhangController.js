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

    console.log(orders);
    res.render('don-hang/danh-sach', {title: 'Danh sách đơn hàng', categories, logined, user, orders});
};
