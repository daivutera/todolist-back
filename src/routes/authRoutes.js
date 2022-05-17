const express = require('express');
const authRouter = express.Router();
const validation = require('../middleware/jwtValidation');
const authController = require('../controllers/authController');

authRouter.post('/login', validation, authController.loginUser);
authRouter.post('/register', validation, authController.registerUser);

module.exports = authRouter;
