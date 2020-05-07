
var ObjectId = require('mongodb').ObjectId; 
const Need = require('./../model/need.js');
const User = require('./../model/usermodel');
const Available = require('./../model/availability');

exports.getDonorList = async (req,res,next) => {
    // For given NGO get NGO need , location , type of food , timing 
    const id = req.body.postedBy;
    const List = await Need.find({'postedBy' : ObjectId(id)});
    console.log(List);
    const location = List[0].location;
    const time = List[0].pickuptime;
    const type_of_food = List[0].type_of_food;
    req.location = location;
    req.type_of_food = type_of_food; 
    req.time = time;
    next(); // Till this point we have found people     
}

exports.getList = async (req,res,next) => {
    try {
        const data =await Available.aggregate([
            {
                $match : { type_of_food : { $eq : req.type_of_food  } }
            },
            {
                $group : {
                    _id : req.location
                }
            }
        ]);
        res.status(201).json({
            "Status" : "Success",
            data
        });
    }
    catch(err) {
        res.status(404).json({
            'Status' : 'fail',
            'message' : err
        });
    }
}
