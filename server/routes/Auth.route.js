

const router = require('express').Router();
const authController = require('../controllers/Auth.controller');

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// Logout route
router.post('/logout', authController.logOut);


module.exports = router;