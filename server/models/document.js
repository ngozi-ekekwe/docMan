'use strict';
module.exports = function(sequelize, DataTypes) {
  const Document = sequelize.define('Documents', {
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
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Document.belongsTo(models.User, {
          as: 'userId',
          onDelete: 'CASCADE',
          foreignKey: {allowNull: false}
        });
      }
    }
  });
  return Document;
};