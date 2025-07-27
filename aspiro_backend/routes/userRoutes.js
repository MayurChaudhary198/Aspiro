const express = require('express');
const router = express.Router();
const { getProfile, getCandidateDashboard, getEmployerDashboard } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

// Protected route
router.get('/profile', protect, getProfile);
router.get('/candidate/dashboard', protect, getCandidateDashboard);
router.get('/employer/dashboard', protect, getEmployerDashboard); 

module.exports = router;