var Sequelize = require('sequelize');
var db = require('../dbs/mysql');
const Product = require('../models/sanpham');

var Cart = db.sequelize.define('cart',{
    uid:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    pid:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    quantity:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    dateadd:{
        type:Sequelize.DATE,
        primaryKey: true,
        allowNull: false
    },
});

Cart.hasOne(Product,{
    onDelete: 'cascade',
    foreignKey: {
        field: 'pid', allowNull: false,
    },
    sourceKey: 'pid',
});

module.exports = Cart;
