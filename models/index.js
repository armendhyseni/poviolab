'use strict';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV.trim() || 'development';
const config = require('../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.authenticate()
    .then(() => { console.log('conneted')})
    .catch((error) =>{ console.log('unable to connect')});

//models

db.Users = require('./users.model')(sequelize, Sequelize);
db.UsersLikes = require('./users.likes.model.ts')(sequelize, Sequelize);
module.exports = db;
