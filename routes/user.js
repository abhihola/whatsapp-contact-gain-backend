const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/register', userController.registerUser);
router.get('/list', userController.getAllUsers);

// Referral system
router.post('/refer', userController.addReferral);
router.get('/referrals/:id', userController.getUserReferrals);

module.exports = router;
