const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Wishlist = require('./wishlist');

const WishlistItem = sequelize.define('WishlistItem', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  alert_price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  uid: {
    type: DataTypes.INTEGER,
    references: {
      model: Wishlist,
      key: 'uid'
    }
  }
}, { timestamps: false });

module.exports = WishlistItem;
