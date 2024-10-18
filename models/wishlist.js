const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Wishlist = sequelize.define('Wishlist', {
  uid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: User,
      key: 'uid'
    }
  }
}, { timestamps: false });

module.exports = Wishlist;
