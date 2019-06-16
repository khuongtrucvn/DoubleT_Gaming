var Sequelize = require('sequelize');
var db = require('../common/mysql');

var Order = db.sequelize.define('product_order',{
    oid:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },

    pid:{
        type:Sequelize.INTEGER,
        allowNull: false
    },

    status:{
        type:Sequelize.STRING(50),
    },

    total:{
        type:Sequelize.BIGINT,
        allowNull: false
    },

    name:{
        type:Sequelize.STRING(30),
        allowNull: false
    },

    phonenumber:{
        type:Sequelize.STRING(50),
        allowNull: false
    },

    email:{
        type:Sequelize.STRING(50),
        allowNull: false
    },

    address:{
        type:Sequelize.STRING(255),
        allowNull: false
    },

    description:{
        type:Sequelize.STRING(255),
        allowNull: true
    },
})

module.exports = Order;
