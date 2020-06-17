
/////////////////////////LOG IN MGR /////////////////////////////////////////////////////////////////



const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken');
const User  = require('../model/usermodel.js');

exports.Signup = async (req,res,next) => {
    try {
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
        var user2 = await User.find();
        for(var i=0;i<user2.length;i++) {
            if(user2[i].UserName == req.body.UserName || user[i].DirectorPhone == req.body.DirectorPhone || user[i].Email == req.body.Email) {
                return next('There is some issue in our project');
            } 
        }
        const users = await User.create(user); 
        // console.log(users);
        var token = await jwt.sign({id:users._id},process.env.KEY,{
            expiresIn: "60d"
        })    
        res.cookie('jwt',token,{
            expires : new Date(Date.now() + 90*24*60*60*1000) 
        })
        res.status(200).send({
            "Status" : "Success",
            users,token
        })
    }
    catch(e) {
        const err = new Error();
        err.statusCode = err.statusCode || 404;
        err.status = err.status || 'fail'
        err.message = "This Email id already exist"   
	    res.status(err.statusCode).json({
		    Status : err.status,
	    	Message : err.message
        });
    }
}
const correctPassword = (password1,password2) => {
    return bcrypt.compare(password1,password2);
}
exports.login = async(req,res,next) => {
    try {
        const UserId = req.body.UserName,password = req.body.Password;
        console.log(password);

        if(!UserId || !password) {
            next('We need userId and Password to do our work');
        }
        const user = await User.findOne({ "UserName" : UserId }).select('+Password');
        console.log(user);
        if (!user || !(await correctPassword(password, user.Password))) {
            return next('Incorrect email or password');
        }
        const token = jwt.sign({id:user._id},process.env.KEY,{
            expiresIn: "60d"
        });
        res.cookie('jwt',token,{
            expires : new Date(Date.now() + 90*24*60*60*1000)
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

exports.logout = async (req,res,next) => {
    res.cookie('jwt','Logging out',{
        expires : new Date(Date.now() + 10*1000),
        httpOnly : true 
    });
    res.status(200).json({
        "Status" : "Success"
    });
}

exports.protect = async(req,res,next) => {
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
    const decoded = await jwt.verify(token,process.env.KEY);
    // console.log(decoded); 
    if(!req.body.postedBy) {
        req.body.postedBy = decoded.id; 
    } 
    if(!req.body.allotedTo) {
        req.body.allotedTo = decoded.id;
    }
    // Check if user still exist 
    const freshUser = await User.findById(decoded.id);

    if(!freshUser) {
        return next('There is some error in protect file');
    }
    return next();

}