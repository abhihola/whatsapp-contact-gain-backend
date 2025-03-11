const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Admin authentication (future implementation)
router.post('/login', adminController.adminLogin);

// Manage users
router.post('/add-user', adminController.addUser);
router.delete('/remove-user/:id', adminController.removeUser);
router.get('/export-users', adminController.exportUsers);

// Toggle settings
router.post('/toggle-premium', adminController.togglePremiumAccess);
router.post('/toggle-referral-notifications', adminController.toggleReferralNotifications);

module.exports = router;
