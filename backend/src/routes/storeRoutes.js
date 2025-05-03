const express = require('express');
const router = express.Router();
const storeController = require('../controller/storeController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware.js');

router.post('/stores', authenticateToken, authorizeRole(['admin']), storeController.createStore);
router.get('/stores', authenticateToken, storeController.getAllStores);

module.exports = router;
