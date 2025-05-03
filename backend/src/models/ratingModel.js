const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');
const Store = require('./storeModel.js');
const User = require('./userModel.js');

const Rating = sequelize.define('Rating', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

Rating.belongsTo(Store);
Rating.belongsTo(User);

module.exports = Rating;
