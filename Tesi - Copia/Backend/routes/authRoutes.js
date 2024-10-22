const express = require('express');
const { signup, login, logout, getUser, updateUser, deleteUser, resetPassword, changePassword } = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authenticateUser, logout);
router.get('/user', authenticateUser, getUser);
router.put('/change-password', authenticateUser, changePassword);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/reset-password', resetPassword);

module.exports = router;
