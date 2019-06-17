var Sequelize = require('sequelize');
var db = require('../dbs/mysql');

var Comment = db.sequelize.define('comment',{
    pid:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },

    name:{
        type:Sequelize.STRING(100),
        allowNull: false
    },

    description:{
        type:Sequelize.STRING(10000),
        allowNull: false
    },

    datecomment:{
        type:Sequelize.DATE,
        allowNull: false
    },
})

module.exports = Comment;