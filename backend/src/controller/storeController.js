const Store = require('../models/storeModel.js');

const createStore = async (req, res) => {
  const { name, email, address } = req.body;
  const newStore = await Store.create({ name, email, address });
  res.status(201).json(newStore);
};

const getAllStores = async (req, res) => {
  const stores = await Store.findAll();
  res.json(stores);
};

module.exports = { createStore, getAllStores };
