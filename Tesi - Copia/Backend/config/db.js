const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('cyberdb', 'postgres', 'root', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;