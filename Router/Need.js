const express = require('express');
const router = express.Router();
const Need = require('./../controller/NeedController.js');
const User = require('./../controller/UserController.js');


router.route('/')
    .post(User.protect,Need.Needfood)
    .get(Need.getAllNeed)

module.exports = router;