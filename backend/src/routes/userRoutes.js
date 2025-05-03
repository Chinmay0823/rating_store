const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authenticateToken, authorizeRole } = require('../middleware/authMiddleware');

router.post('/users', authenticateToken, authorizeRole(['admin']), userController.createUser);

module.exports = router;
