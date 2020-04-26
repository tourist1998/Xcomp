
const express = require('express');
const app =  express();
const router = express.Router();


const Firstpage = async (req,res,next) => {
    res.status(200).render('overview',{
    })
}
const login = async(req,res,next) => {
    res.status(200).render('login',{

    });
}

const signup = async (req,res,next) => {
    res.status(201).render('signup',{

    });
}

const ngosignup = async (req,res,next) => {
    res.status(201).render('Ngosignup',{
        title : "NGO signup form"
    });
}

const Donorsignup = async (req,res,next) => {
    res.status(201).render('Donorsignup',{

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
module.exports = router;