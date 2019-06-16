var Sequelize = require('sequelize');
var db = require('../common/mysql');

var Category = db.sequelize.define('category',{
    id:{
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
})

module.exports = Category;