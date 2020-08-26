const env = process.env.NODE_ENV || 'test';
const config = require('../config/config.json')[env];
const { Sequelize } = require('sequelize', {define: {timestamps: false}});
module.exports = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect
});

