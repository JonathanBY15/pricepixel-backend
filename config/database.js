const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('price_pixel', 'postgres', 'walmart48', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
