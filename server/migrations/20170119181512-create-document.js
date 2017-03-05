'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      access: {
        allowNull: false,
        defaultValue: 'public',
        type: Sequelize.STRING
      },
      ownerId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Documents');
  }
};