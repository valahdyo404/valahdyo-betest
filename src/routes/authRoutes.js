const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/generate-token', AuthController.generateToken);

// Additional routes

module.exports = router;
