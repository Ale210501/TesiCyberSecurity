// models/index.js
const User = require('./User');
const Project = require('./Project');
const Connection = require('./Connection');

// Definisci le associazioni
User.hasOne(Project, { foreignKey: 'userId', as: 'project' });
Project.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasOne(Project, { foreignKey: 'userId', as: 'connection' });
Connection.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = { User, Project, Connection };
