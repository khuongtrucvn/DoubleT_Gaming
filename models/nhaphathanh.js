var Sequelize = require('sequelize');
var db = require('../dbs/mysql');

var Publisher = db.sequelize.define('publisher',{
    pbid:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },

    name:{
        type:Sequelize.STRING(50),
        allowNull: false
    },
})

module.exports = Publisher;