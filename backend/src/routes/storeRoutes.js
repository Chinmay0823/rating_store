const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const { createStore, getAllStores, getStoreRatings } = require('../models/storeModel.js');


router.post('/', auth(['ADMIN']), async (req, res) => {
  try {
    const { name, email, address, owner_id } = req.body;
    const store = await createStore({ name, email, address, owner_id });
    res.json(store);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', auth(), async (req, res) => {
  try {
    const stores = await getAllStores();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id/ratings', auth(['STORE_OWNER']), async (req, res) => {
  try {
    const { id } = req.params;
    const ratings = await getStoreRatings(id);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
