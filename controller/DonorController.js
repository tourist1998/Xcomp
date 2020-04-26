const express = require('express');
const app= express();
const Donor = require('./../model/Donormodel.js')
const router = express.Router();

const getAllDonor = async(req,res,next) => {
    const Donor1 = await Donor.find();
    res.send({
        "Status" : "Sucess",
        Donor1
    }); 
}
const SignUp = async (req,res,next) => {
    const Donor1 = await Donor.create(req.body);
    Donor1.save();
    console.log(Donor1); 
    res.status(200).json({
        "Status" : "Sucess",
        Donor1
    });
}
router.route('/')
    .get(getAllDonor)
    .post(SignUp)

module.exports = router;