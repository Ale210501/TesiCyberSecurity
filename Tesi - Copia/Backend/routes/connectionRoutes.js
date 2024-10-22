const express = require('express');
const { createConnection, getConnection, updateConnection, deleteConnection } = require('../controllers/connectionController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticateUser, createConnection);
router.get('/connection', authenticateUser, getConnection);
router.put('/change', authenticateUser, updateConnection);
router.delete('/delete', authenticateUser, deleteConnection);

module.exports = router;



