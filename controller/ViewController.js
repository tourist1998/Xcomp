
const express = require('express');
const app =  express();
const jwt= require('jsonwebtoken');
const router = express.Router();
const User = require('./../model/usermodel');
const Need = require('./../model/need');
const Available = require('./../model/availability'); 
const AllocationMGR = require('./AllocationMGR');
const User1 = require('./UserController');
const allocate = require('./../model/allocate.js');
const Firstpage = async (req,res,next) => {
    res.status(200).render('overview');
}
const login = async(req,res,next) => {
    res.status(200).render('login');
}

const signup = async (req,res,next) => {
    res.status(201).render('signup');
}

const ngosignup = async (req,res,next) => {
    res.status(201).render('Ngosignup');
}

const Donorsignup = async (req,res,next) => {
    res.status(201).render('Donorsignup');
}

const PostNeed = async (req,res,next) => {
    res.status(201).render('PostNeed');
}
const PostAvail = async (req,res,next) => {
    res.status(201).render('PostAvail');
}

const NGOpostneed = async (req,res,next) => {
    res.status(201).render('NGOpostneed');
}

const NGOlist = async (req,res,next) => {
    const USER = await Need.find();
    console.log(USER);
    res.status(201).render('NGOlist',{
        USER
    });
   // res.send('Hi');
}
const ViewPickUpList = async (req,res,next) => {
    const list = await Available.find();
    res.status(201).render('pickuplist',{
        list
    });
}
const isLoggedIn = async(req,res,next) => {
    let token;
    if(req.cookies.jwt) {
        token = req.cookies.jwt;   
    }
    console.log(token);
    if(!token) { 
        return next('You need to login to get access to this page');
    }
    const decoded = await jwt.verify(token,process.env.key);
    console.log(decoded); 
    if(!req.body.postedBy) {
        req.body.postedBy = decoded.id; 
    } 
    // Check if user still exist 
    const freshUser = await User.findById(decoded.id);

    if(!freshUser) {
        return next(err => console.log(err));
    }
    res.locals.user = freshUser; // This give access to freshuser to all 
    next();
}

const example = async (req,res,next) => {
    const users = await User.find();
    console.log(users);
    res.status(200).render('example',{
        users
    })
}
const postFoodAvail = async (req,res,next) => {
    res.status(200).render('postFoodAvail');
}

const status = async (req,res,next) => {
    const all = await allocate.find({alloted : req.body.postedBy});
    console.log(all);
    res.status(201).render('status',{
        all
    });
}
///////////////////////////////////////////////////////////////MODEL////////////////////////////////////////////////////////


router.route('/')
    .get(Firstpage)
router.route('/login')
    .get(login);
router.route('/signup')
    .get(signup);
router.route('/ngosignup')
    .get(ngosignup);
router.route('/Donorsignup')
    .get(Donorsignup);
router.route('/PostNeed')
    .get(isLoggedIn,PostNeed);
router.route('/PostAvail')
    .get(isLoggedIn,PostAvail);
router.route('/NGOpostneed')
    .get(NGOpostneed);
router.route('/exm')
    .get(isLoggedIn,example)
router.route('/postFoodAvail')
    .get(isLoggedIn,postFoodAvail);
router.route('/ViewPickUpList')
    .get(isLoggedIn,ViewPickUpList);
router.route('/NGOlist')
    .get(isLoggedIn,NGOlist);
router.route('/status')
    .get(isLoggedIn,status);
module.exports = router;
