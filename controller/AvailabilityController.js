const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const router = express.Router();
const Availability = require('./../model/availability.js');
const User = require('./../model/usermodel.js');


const protect = async(req,res,next) => {
    let token;
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer') ) {
        token = req.headers.authorization.split(' ')[1]; 
    }
    else if(req.cookies.jwt) {
        token = req.cookies.jwt;   
    }
    // console.log(token);
    if(!token) { 
        return next('fail');
    }
    const decoded = await jwt.verify(token,"This should be tough to guess");
    // console.log(decoded); 
    if(!req.body.postedBy) {
        req.body.postedBy = decoded.id; 
    } 
    // Check if user still exist 
    const freshUser = await User.findById(decoded.id);

    if(!freshUser) {
        return next(err => console.log(err));
    }
    return next();

}

const Availablefood = async(req,res,next) => {
    const available = await Availability.create(req.body); 
    available.save();
    res.status(200).json({
        "Status" : "Success",
        available
    }); 
}

const getAllAvailability = async(req,res,next) => {
    const Available = await Availability.find();
    res.status(200).json({
        "Status" : "Sucess",
        Available
    })
}

////////////////////////////////////////////////////MODEL///////////////////////////////////////////////////////
router.route('/')
    .post(protect,Availablefood)
    .get(getAllAvailability)

module.exports = router;