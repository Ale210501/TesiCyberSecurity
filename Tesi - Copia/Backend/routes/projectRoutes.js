const express = require('express');
const { createProject, getProject, updateProject, deleteProject } = require('../controllers/projectController');
const authenticateUser = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authenticateUser, createProject);
router.get('/project', authenticateUser, getProject);
router.put('/change', authenticateUser, updateProject);
router.delete('/delete', authenticateUser, deleteProject);

module.exports = router;
