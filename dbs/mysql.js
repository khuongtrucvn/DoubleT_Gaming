const Sequelize = require('sequelize');
const db ={};
const sequelize = new Sequelize('qlgamedb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define:{
        freezeTableName: true,
        timestamps: false
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;