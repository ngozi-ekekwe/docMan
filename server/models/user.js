'use strict';
const bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    firstname: {
      allowNull: false,
      type: DataTypes.STRING

    },
    lastname: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    }
  }, {
    classMethods: {
      associate(models) {
        User.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE',
        });

        User.hasMany(models.Document, {
          foreignKey: 'userId',
          onDelete: 'CASCADE'
        });
      }
    },

    instanceMethods: {
      validPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },

    hooks: {
      beforeCreate(user) {
        user.hashPassword()
      },

      beforeUpdate(user) {
        if(user._changed.password) {
          user.hashPassword();
        }
      }
    }
  });
  return User;
};
