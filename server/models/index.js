'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var dotenv = require('dotenv');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.js')[env];
var db = {};

dotenv.config();

if (config.url) {
  var sequelize = new Sequelize(config.url);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password,
    config);
}

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
