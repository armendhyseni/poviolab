const { Sequelize } = require('sequelize', {define: {timestamps: false}});
module.exports = new Sequelize('poviolabs', 'postgres', '123123', {
    host: 'localhost',
    dialect: 'postgres'
});

