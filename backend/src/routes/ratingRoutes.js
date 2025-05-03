const express = require('express');
const router = express.Router();
const ratingController = require('../controller/ratingController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

router.post('/ratings/:storeId', authenticateToken, ratingController.submitRating);

module.exports = router;
