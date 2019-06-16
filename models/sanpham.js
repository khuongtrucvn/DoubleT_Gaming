var Sequelize = require('sequelize');
var db = require('../dbs/mysql');

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

    publisher:{
        type:Sequelize.STRING(30),
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
})

module.exports = Product;
