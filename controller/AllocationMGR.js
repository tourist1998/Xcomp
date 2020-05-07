
var ObjectId = require('mongodb').ObjectId; 
const Need = require('./../model/need.js');
const User = require('./../model/usermodel');
const Available = require('./../model/availability');
var loc = [];

exports.groupByLocation = async (req,res,next) => {
    try {
        const data =await Available.aggregate([
            {
                $match : { type_of_food : { $eq : req.type_of_food  } } // Filtering them on basis of type of food 
            },
            {
                $group : {
                    _id : req.location // Groupong them on basis of their current location 
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

exports.FoodNeedByNGO = async(req,res,next) => {
    // For given user we have collected Need of that user
    const need = await Need.find({'postedBy' : req.body.postedBy }); 
    console.log(need);
    // Now we only need location were he wanted to serve. 
    for(var i=0;i<need.length;i++) {
        loc.push(need[i].location);
    }
    console.log(loc);
    // Now on basis of this location and type of food 
    next();
}

// Get all Donor for a specific location where this donor wanted to serve

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

exports.GetDonorList = async (req,res,next) => {
    var unique = loc.filter(onlyUnique); // Get unique address 

    var list = [];
    // Traverse unique array and send a array of object 
    for(var i=0;i<unique.length;i++) {
        const availabilityByLocation = await Available.find({'location' : unique[i]}); 
        if(availabilityByLocation.length != 0) 
        list.push(availabilityByLocation);
    }
    // console.log(list);
    res.status(201).json({
        "Status" : "Success",
        list
    });

}
/* Output of this list that we have as array of array. Now on basis of this array we have 
to create our pickuplist page for a given user. 
[
    [
      {
        type_of_food: 'Anything',
        pickuptime: '19:30',
        _id: 5eb1af583bfd074fb4da08ad,
        location: 'how',
        total_person_served: 100,
        postedBy: 5eb1ae043bfd074fb4da08ac,
        __v: 0
      },
      {
        type_of_food: 'Anything',
        pickuptime: '14:00',
        _id: 5eb3ee88874921510806034f,
        location: 'how',
        total_person_served: 100,
        postedBy: 5eb3ee51874921510806034e,
        __v: 0
      }
    ],
    []
  ]
]
*/