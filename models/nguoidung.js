var Sequelize = require('sequelize');
var db = require('../dbs/mysql');

var User = db.sequelize.define('user_account',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },

    username:{
        type:Sequelize.STRING(50),
        allowNull: false
    },

    password:{
        type:Sequelize.STRING(50),
        allowNull: false
    },

    name:{
        type:Sequelize.STRING(50),
        allowNull: false
    },

    url:{
        type:Sequelize.STRING(500),
        allowNull: true
    },

    email:{
        type:Sequelize.STRING(50),
        allowNull: false
    },

    phonenumber:{
        type:Sequelize.STRING(50),
        allowNull: false
    },

    address:{
        type:Sequelize.STRING(255),
        allowNull: false
    },
})

module.exports = User;
