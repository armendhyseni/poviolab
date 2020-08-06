'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          firstname: {
            type: Sequelize.STRING,
            notNull: true
          },
          lastname: {
            type: Sequelize.STRING,
            notNull: true
          },
          username: {
            type: Sequelize.STRING,
            notNull: true
          },
          password: {
            type: Sequelize.STRING,
            notNull: true
          },
          createdAt: {
            type: Sequelize.DATE
          },
          updatedAt: {
            type: Sequelize.DATE
          }
        },
        {
          schema: 'public'
        }
    )
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('users')
  }
};
