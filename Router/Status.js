const express = require('express');
const router = express.Router();


const AllocationMGR = require('./../controller/AllocationMGR');
const User = require('./../controller/UserController');

router.route('/')
    .post(User.protect,AllocationMGR.RemoveAllocation);

module.exports = router;