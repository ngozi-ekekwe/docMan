'use strict';
module.exports = function(sequelize, DataTypes) {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    access: {
      type: DataTypes.STRING,
      defaultValue: 'public'
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          foreignKey: 'ownerId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return Document;
};