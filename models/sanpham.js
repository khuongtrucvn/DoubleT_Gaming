var Sequelize = require('sequelize');
var db = require('../dbs/mysql');
const Category = require('../models/theloai');
const Publisher = require('../models/nhaphathanh');

var Product = db.sequelize.define('product',{
    pid:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },

    name:{
        type:Sequelize.STRING(30),
        allowNull: false
    },

    cid:{
        type:Sequelize.INTEGER,
        references: {
            model: Category,
            key: 'id',

        },
        allowNull: false
    },

    avatar:{
        type:Sequelize.STRING(255),
        allowNull: false
    },

    imgurl1:{
        type:Sequelize.STRING(255),
        allowNull: true
    },

    imgurl2:{
        type:Sequelize.STRING(255),
        allowNull: true
    },

    imgurl3:{
        type:Sequelize.STRING(255),
        allowNull: true
    },

    price:{
        type:Sequelize.FLOAT,
        allowNull: false
    },

    quantity:{
        type:Sequelize.INTEGER,
        allowNull: false
    },

    pbid:{
        type:Sequelize.INTEGER,
        references: {
            model: Publisher,
            key: 'pbid',
        },
        allowNull: true
    },

    developer:{
        type:Sequelize.STRING(30),
        allowNull: true
    },

    description:{
        type:Sequelize.STRING(255),
        allowNull: true
    },
});

Product.hasOne(Category,{
    onDelete: 'cascade',
    foreignKey: {
        field: 'id', allowNull: false,
    },
    sourceKey: 'cid',
});

Product.hasOne(Publisher,{
    onDelete: 'cascade',
    foreignKey: {
        field: 'pbid', allowNull: true,
    },
    sourceKey: 'pbid',
});

module.exports = Product;
