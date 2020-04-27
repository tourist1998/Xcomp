
const express = require('express');
const app =  express();
const router = express.Router();


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
const isLoggedIn = async(req,res,next) => {
    let token;
    if(req.cookies.jwt) {
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
    res.locals.user = freshUser; // This give access to freshuser to all 
    next();

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
    .get(PostNeed);
router.route('/PostAvail')
    .get(PostAvail);
router.route('/NGOpostneed')
    .get(NGOpostneed);
module.exports = router;