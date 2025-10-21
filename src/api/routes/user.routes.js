const express = require('express');
const userController = require('../controllers/user.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/me', verifyToken, userController.getProfile);

module.exports = router;