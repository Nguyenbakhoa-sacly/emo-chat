const userController = require('../controllers/User.controller');
const router = require('express').Router();
const verifyToken = require('../utils/verifyUser')


router.put('/updateUser/:userId', verifyToken, userController.updateUser);


module.exports = router;