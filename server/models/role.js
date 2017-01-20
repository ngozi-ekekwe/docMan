'use strict';
module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define('role', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Role.hasMany(model.User);
      }
    }
  });
  return Role;
};