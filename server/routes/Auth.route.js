

const router = require('express').Router();

const authController = require('../controllers/Auth.controller');

// Register route
router.post('/register', authController.register);

// Login route

module.exports = router;