const express = require('express');
const router = express.Router();
const app = express();

const AllocationMGR = require('./../controller/AllocationMGR');
const User = require('./../controller/UserController');

router.route('/')
    .get(User.protect,AllocationMGR.FoodNeedByNGO,AllocationMGR.GetDonorList)
    .post(User.protect,AllocationMGR.foodAllocatedToDonor)
module.exports = router;