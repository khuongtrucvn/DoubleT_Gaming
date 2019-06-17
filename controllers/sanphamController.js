const Product = require('../models/sanpham');
const Category = require('../models/theloai');
const Publisher = require('../models/nhaphathanh');
const Comment = require('../models/binhluan');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.danhsach = async (req, res) => {
    const categories = await Category.findAll({raw:true});
    const publishers = await Publisher.findAll({raw:true, limit:10});
    const products = await Product.findAll({raw:true,limit:12, order:[[Sequelize.col('pid'),'DESC']]});

    res.render('san-pham/danh-sach', { title: 'Danh sách sản phẩm', categories, publishers, products});
};

exports.chitiet = async (req, res) => {
    const categories = await Category.findAll({raw:true});
    const product = await Product.findByPk(req.params.id,{raw:true,
        attributes: {
            include: [[Sequelize.literal('Category.name'), 'cname'],[Sequelize.literal('Publisher.name'), 'pbname']]
        },
        include: [{ model: Category, attributes: [] },{model: Publisher, attributes: []}]
    });
    const comments = await Comment.findAndCountAll({raw:true, where:{pid:product.pid}, order:[[Sequelize.col('datecomment'),'DESC']]});
    const related = await Product.findAll({raw:true, where:Sequelize.and({cid:product.cid},{pid:{[Op.ne]:req.params.id}}), limit:8, order:Sequelize.fn( 'RAND' )});

    res.render('san-pham/chi-tiet', {title: product.name, categories, product, comments, related});
};

exports.binhluan_post = async (req, res) => {
    const message = await req.body.Message;
    const name = await req.body.Name;

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const datecomment = date+' '+time;

    Comment.create({
        pid:req.params.id,
        name:name,
        description:message,
        datecomment:datecomment,
    });

    res.redirect('/san-pham/id='+req.params.id);
};