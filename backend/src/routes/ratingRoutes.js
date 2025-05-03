const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware.js');
const { upsertRating, getUserRating } = require('../models/ratingModel.js');


router.post('/', auth(['NORMAL_USER']), async (req, res) => {
  try {
    const user_id = req.user.id;
    const { store_id, rating_value } = req.body;

    if (rating_value < 1 || rating_value > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    const rating = await upsertRating(user_id, store_id, rating_value);
    res.json(rating);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:store_id', auth(['NORMAL_USER']), async (req, res) => {
  try {
    const rating = await getUserRating(req.user.id, req.params.store_id);
    res.json(rating || { rating_value: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
