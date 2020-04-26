const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const router = express.Router();
const Need = require('./../model/need.js');
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
const Needfood = async(req,res,next) => {
    const need = await Need.create(req.body); 
    need.save();
    res.status(200).json({
        "Status" : "Sucess",
        need
    }); 
}

const getAllNeed = async(req,res,next) => {
    const need = await Need.find();
    res.status(200).send({
        "Status" : "Sucess",
        need
    });
}

////////////////////////////////////////////////////MODEL///////////////////////////////////////////////////////
router.route('/')
    .post(protect,Needfood)
    .get(getAllNeed)

module.exports = router;