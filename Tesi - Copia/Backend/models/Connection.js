const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Connection = sequelize.define('Connection', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    containerId:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    tools: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
    },
    userId: {  // Aggiunta della chiave esterna
        type: DataTypes.INTEGER,
        references: {
            model: 'Users', // Nome della tabella degli utenti
            key: 'id',
        },
        allowNull: false,
    },
});

module.exports = Connection;
