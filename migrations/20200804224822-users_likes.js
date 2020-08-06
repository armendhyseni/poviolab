'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable(
        'users_likes',
        {
          user_likes: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id',
            },
            primaryKey: true,
            onUpdate: 'cascade',
            onDelete: 'cascade'
          },
          user_liked: {
            type: Sequelize.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            },
            primaryKey: true,
            onUpdate: 'cascade',
            onDelete: 'cascade'
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
    queryInterface.dropTable('users_likes')
  }
};
