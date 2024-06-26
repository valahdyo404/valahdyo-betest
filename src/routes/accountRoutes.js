const express = require('express');
const router = express.Router();
const accountController = require('../controllers/AccountController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');

// router.post('/register', accountController.createAccount);
router.post('/login', accountController.login);
router.get('/recent-logins', AuthMiddleware.authenticateToken, accountController.getRecentLogins);

module.exports = router;
