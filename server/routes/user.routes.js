const express= require('express');
const router = express.Router();
const authMiddleware= require('../middleware/auth.middleware');
const {getUserDetails,updateUserDetails} = require("../controllers/user.controller");

router.get('/profile',authMiddleware, getUserDetails );
router.post('/profile',authMiddleware,updateUserDetails);

module.exports = router;