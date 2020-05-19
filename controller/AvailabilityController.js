const jwt = require('jsonwebtoken');
const Availability = require('./../model/availability.js');
const User = require('./../model/usermodel');
exports.Availablefood = async(req,res,next) => {
    const available = await Availability.create(req.body); 
    available.save();
    res.status(200).json({
        "Status" : "Success",
        available
    }); 
}

exports.getAllAvailability = async(req,res,next) => {
    const Available = await Availability.find();
    res.status(200).json({
        "Status" : "Sucess",
        Available
    })
}

exports.updateAvailability = async (req,res,next) => {
    try {
        console.log(req.body._id);
        const Available = await Availability.findByIdAndUpdate(req.body._id,req.body,{
            new: true,
            runValidators : true
        });
        res.status(201).send({
            "status" : "success",
            "message" : "Number of person has been updated",
            Available
        });
    }
    catch(err) {
        var err = new Error();
        err.status = 'fail';
        err.statusCode = 401;
        err.message = 'Problem in updating the data'
        res.status(err.statusCode).json({
            'status' : err.status,
            'message' : err.message
        });
    }
}