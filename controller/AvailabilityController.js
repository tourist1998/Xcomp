const jwt = require('jsonwebtoken');
const Availability = require('./../model/availability.js');

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
