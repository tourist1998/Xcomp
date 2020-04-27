const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const router = express.Router();
const User  = require('../model/usermodel.js');
const Donor = require('../model/Donormodel.js');
const NGO = require('../model/NGOmodel.js');

const Signup = async (req,res,next) => {
    try {
        const data = req.body;
        const user = {
            "Name" : req.body.Name,
            "Email" : req.body.Email,
            "UserName" : req.body.UserName,
            "Password" : req.body.Password,
            "PasswordConfirm" : req.body.PasswordConfirm,
            "Phone" : req.body.Phone,
            "Address" : req.body.Address,
            "Type" : req.body.Type, 
            "TypeofFood" : req.body.TypeofFood,
            "AreaofService" : req.body.AreaofService,
            "DirectorName" : req.body.DirectorName,
            "DirectorPhone" : req.body.DirectorPhone
        }
        const users = await User.create(user); 
        console.log(users);
        var token = await jwt.sign({id:users._id},'This should be tough to guess',{
            expiresIn: "60d"
        })    
        res.cookie('jwt',token,{
            expires : new Date(Date.now() + 90*24*60*60*1000)   // token should be sent through cookies for safety purpose 
        })
        res.status(200).send({
            "Status" : "Success",
            users,token
        })
    }
    catch(e) {
        res.status(404).send({
            "Status" : "fail",
            "message" : "This Email id already exist"
        });
    }
}
const correctPassword = (password1,password2) => {
    return bcrypt.compare(password1,password2);
}
const login = async(req,res,next) => {
    try {
        const UserId = req.body.UserName,password = req.body.Password;
        if(!UserId || !password) {
            next('We need userId and Password to do our work');
        }
        const user = await User.findOne({ "UserName" : UserId }).select('+Password');

        if (!user || !(await correctPassword(password, user.Password))) {
            return next('Incorrect email or password');
        }
        const token = jwt.sign({id:user._id},'This should be tough to guess',{
            expiresIn: "60d"
        });
        res.cookie('jwt',token,{
            expires : new Date(Date.now() + 90*24*60*60*1000),
            secure : true,
            httpOnly : true
        });
        res.send({
            "Status" : "Success",
            token, user
        });
    }
    catch(err) {
        res.status(404).send({
            "message": "Either email is wrong or password"
        });
    }
}

const logout = async (req,res,next) => {
    res.cookie('jwt','Logging out',{
        expires : new Date(Date.now() + 10*1000),
        httpOnly : true 
    });
    res.status(200).json({
        "Status" : "Success"
    });
}

///////////////////////////////////////////////////////////////////////////MODEL//////////////////////////////////////////////////////////// 
router.route('/Signup')
    .post(Signup);
router.route('/login')
    .post(login);
router.route('/logout')
    .get(logout);
module.exports = router; 