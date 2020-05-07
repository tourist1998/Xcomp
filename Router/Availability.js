const express = require('express');
const router  = express.Router();
const Availability = require('./../controller/AvailabilityController.js');
const User = require('./../controller/UserController.js');


router.route('/')
    .post(User.protect,Availability.Availablefood)
    .get(Availability.getAllAvailability)
module.exports = router;