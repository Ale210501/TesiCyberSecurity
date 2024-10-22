// models/Project.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Project extends Model {}

Project.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descrizione: {
        type: DataTypes.STRING,
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
}, {
    sequelize,
    modelName: 'Project',
});

module.exports = Project;
