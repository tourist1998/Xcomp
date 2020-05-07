const express = require('express');
const router = express.Router();

const AllocationMGR = require('./../controller/AllocationMGR');
const User = require('./../controller/UserController');

router.route('/')
    .get(User.protect,AllocationMGR.getDonorList,AllocationMGR.getList);

module.exports = router;