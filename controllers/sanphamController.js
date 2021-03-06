const Product = require('../models/sanpham');
const Category = require('../models/theloai');
const Publisher = require('../models/nhaphathanh');
const Comment = require('../models/binhluan');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.danhsach = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();
    const user = req.user;

    //usual data
    const publishers = await Publisher.findAll({raw:true, limit:10, order:Sequelize.fn( 'RAND' )});
    const products = await Product.findAll({raw:true, order:[[Sequelize.col('pid'),'DESC']]});

    res.render('san-pham/danh-sach', { title: 'Danh sách sản phẩm', categories,logined,user, publishers, products});
};

exports.chitiet = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();
    const user = req.user;

    //usual data
    const product = await Product.findByPk(req.params.id,{raw:true,
        attributes: {
            include: [[Sequelize.literal('Category.name'), 'cname'],[Sequelize.literal('Publisher.name'), 'pbname']]
        },
        include: [{ model: Category, attributes: [] },{model: Publisher, attributes: []}]
    });
    const comments = await Comment.findAndCountAll({raw:true, where:{pid:product.pid}, order:[[Sequelize.col('datecomment'),'DESC']]});
    const related = await Product.findAll({raw:true, where:Sequelize.and({cid:product.cid},{pid:{[Op.ne]:req.params.id}}), limit:8, order:Sequelize.fn( 'RAND' )});

    res.render('san-pham/chi-tiet', {title: product.name, categories,logined,user, product, comments, related});
};

exports.binhluan_post = async (req, res) => {
    const message = await req.body.Message;
    const name = await req.body.Name;

    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const datecomment = date+' '+time;

    console.log(name);
    Comment.create({
        pid:req.params.id,
        name:name,
        description:message,
        datecomment:datecomment,
    });

    res.redirect('/san-pham/id='+req.params.id);
};

exports.timkiem_post = async (req, res) => {
    const searchText = await req.body.Text;

    res.redirect('/san-pham/tim-kiem/key='+searchText);
};

exports.timkiem = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();
    const user = req.user;

    //usual data
    const publishers = await Publisher.findAll({raw:true, limit:10, order:Sequelize.fn( 'RAND' )});
    const products = await Product.findAll({raw:true,
        where:Sequelize.or(
            {name:{[Op.like]:'%'+req.params.id+'%'}},
            {developer:{[Op.like]:'%'+req.params.id+'%'}}),
        order:[[Sequelize.col('pid'),'DESC']]});

    res.render('san-pham/tim-kiem', {title:'Tìm kiếm', categories,logined,user, publishers, products});

    /*let limit = 2;
    const categories = await Category.findAll({raw:true});
    const publishers = await Publisher.findAll({raw:true, limit:10, order:Sequelize.fn( 'RAND' )});
    const data = await Product.findAndCountAll({raw:true,
        where:Sequelize.or(
            {name:{[Op.like]:'%'+req.params.id+'%'}},
            {developer:{[Op.like]:'%'+req.params.id+'%'}})});
    let page = req.params.page || 1;
    let pages = Math.ceil(data.count / limit);
    let offset = limit * (page - 1);
    const products = await Product.findAll({raw:true,
        where:Sequelize.or(
            {name:{[Op.like]:'%'+req.params.id+'%'}},
            {developer:{[Op.like]:'%'+req.params.id+'%'}}),
        order:[[Sequelize.col('pid'),'DESC']],
        limit:limit,
        offset:offset,
    });

    console.log(data.count);
    res.render('san-pham/tim-kiem', {title:'Tìm kiếm', categories, publishers, products, current: page, pages: pages});*/
};

exports.sapxep_post = async (req, res) => {
    const filterChoice = await req.body.Filter;

    res.redirect('/san-pham/sap-xep/filter='+filterChoice);
};

exports.sapxep = async (req, res) => {
    //important data
    const categories = await Category.findAll({raw:true});
    const logined = req.isAuthenticated();
    const user = req.user;

    //usual data
    const publishers = await Publisher.findAll({raw:true, limit:10, order:Sequelize.fn( 'RAND' )});
    let products = null;
    if(req.params.id == 1){
        products = await Product.findAll({raw:true, order:[[Sequelize.col('pid'),'DESC']]});
    }
    else if(req.params.id == 2){
        products = await Product.findAll({raw:true, order:[[Sequelize.col('price'),'ASC']]});
    }
    else if(req.params.id == 3){
        products = await Product.findAll({raw:true, order:[[Sequelize.col('price'),'DESC']]});
    }
    else if(req.params.id == 4){
        products = await Product.findAll({raw:true, order:[[Sequelize.col('name'),'ASC']]});
    }
    else if(req.params.id == 5){
        products = await Product.findAll({raw:true, order:[[Sequelize.col('name'),'DESC']]});
    }

    res.render('san-pham/sap-xep', {title:'Tìm kiếm', categories,logined,user, publishers, products});
};