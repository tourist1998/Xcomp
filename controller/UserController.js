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
            "Type" : req.body.Type 
        }
        const users = await User.create(user); 
        const token = await jwt.sign({id:users._id},'This should be tough to guess',{
            expiresIn: "60d"
        })     // Secret is written here. This should be mentioned seperate
        res.cookie('jwt',token,{
            expires : new Date(Date.now() + 90*24*60*60*1000),   // token should be sent through cookies for safety purpose 
            httpOnly : true
        })
        if(req.body.Type=='NGO') {
            const ngo = {
                "DirectorName" : req.body.DirectorName,
                "DirectorPhone" : req.body.DirectorPhone,
                "Details" : users._id
            }
            const ngos = await NGO.create(ngo);
            res.status(200).json({
                "Status" : "Sucess",
                ngos,users,token
            });
        }
        else {
            const donor = {
                "TypeofFood" : req.body.TypeofFood,
                "AreaofService" : req.body.AreaofService,
                "Details" : users._id
            };
            const donors = await Donor.create(donor);
            res.status(200).json({
                "Status" : "Sucess",
                donors,users,token
            });
        }
    }
    catch(e) {
        console.log('There is some error that we are facing in Signup block');
    }
}
const correctPassword = (password1,password2) => {
    return bcrypt.compare(password1,password2);
}
const login = async(req,res,next) => {
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
    })
    res.send({
        "Status" : "Success",
        token,
        user
    });
}


///////////////////////////////////////////////////////////////////////////MODEL//////////////////////////////////////////////////////////// 
router.route('/Signup')
    .post(Signup);
router.route('/login')
    .post(login);
module.exports = router; 