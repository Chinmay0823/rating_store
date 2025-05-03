const Rating = require('../models/ratingModel.js');
const Store = require('../models/storeModel.js');
const User = require('../models/userModel.js');

const submitRating = async (req, res) => {
  const { rating } = req.body;
  const { storeId } = req.params;
  const { userId } = req.user;

  const store = await Store.findByPk(storeId);
  if (!store) return res.status(404).json({ message: 'Store not found' });

  const newRating = await Rating.create({ rating, storeId, userId });
  res.status(201).json(newRating);
};

module.exports = { submitRating };
