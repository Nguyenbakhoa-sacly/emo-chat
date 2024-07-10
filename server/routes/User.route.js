const userController = require('../controllers/User.controller');
const router = require('express').Router();
const verifyToken = require('../utils/verifyUser')


router.put('/updateuser/:userId', verifyToken, userController.updateUser);
router.post('/search-user', userController.searchUser);

module.exports = router;