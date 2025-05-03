const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js'); // ✅ instance, not the class

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
