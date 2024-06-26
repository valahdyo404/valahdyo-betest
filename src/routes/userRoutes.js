const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const AuthMiddleware = require('../middlewares/AuthMiddleware');




router.post('/register', userController.createUser);
router.get('/account/:accountNumber', AuthMiddleware.authenticateToken, userController.getUserByAccountNumber);
router.get('/registration/:registrationNumber', AuthMiddleware.authenticateToken, userController.getUserByRegistrationNumber);
router.put('/:userId', AuthMiddleware.authenticateToken, userController.updateUser);
router.delete('/:userId', AuthMiddleware.authenticateToken, userController.deleteUser);

module.exports = router;
