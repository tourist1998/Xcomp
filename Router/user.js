const express = require('express');
const router = express.Router();
const User = require('./../controller/UserController');


router.route('/Signup')
    .post(User.Signup);
router.route('/login')
    .post(User.login);
router.route('/logout')
    .get(User.logout);
    
module.exports = router; 