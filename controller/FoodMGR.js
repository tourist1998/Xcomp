
const Need = require('./../model/need.js');
const Availability = require('./../model/availability.js');
const Allocate = require('./../model/allocate');

exports.ViewPostNeed = async (req,res,next ) => {
    try {
        const need = await Need.find();
        res.status(201).json({
            "Status" : "Success",
            need
        });
    }
    catch(err) {
        res.status(401).json({
            "Status" : "fail",
            "Message" : "There is some error in fetching data that is needed"
        });
    }
}

exports.ViewPostAvailability = async (req,res,next) => {
    try {
        const available = await Availability.find();
        res.status(201).json({
            "Status" : "Success",
            available
        });
    }
    catch(err) {
        res.status(401).json({
            "Status" : "fail",
            "Message" : "There is some error in fetching data that is Available"
        });
    }
}

exports.pickUpList = async (req,res,next) => {
    try {
        const allocation = Allocate.find({Needid : req.Needid});        
        res.status(201).json({
            "Status" : "Success",
            allocation
        });
    }
    catch(err) {
        res.status(401).json({
            "Status" : "fail",
            "Message" : "There is some problem in fetching pickup List for you"
        });
    }
}