
var ObjectId = require('mongodb').ObjectId; 
const Need = require('./../model/need.js');
const User = require('./../model/usermodel');
const Available = require('./../model/availability');
const allocate = require('./../model/allocate.js');

var loc = [];
var type2; 
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

exports.groupByFood = async (req,res,next) => {
    try {
        const data =await Available.aggregate([
            {
                $match : { location : { $eq : req.location  } } // Filtering them on basis of location  
            },
            {
                $group : {
                    _id : req.type_of_food // Groupong them on basis of food type 
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
    res.locals.loc = loc; 
    type2 = req.body.type_of_food;
    console.log(type2);
    // Now on basis of this location and type of food 
    next();
}

// Get all Donor for a specific location where this donor wanted to serve

function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

exports.GetDonorList = async (req,res,next) => {
    var unique = loc.filter(onlyUnique); // Get unique address 

    const list = [];
    // Traverse unique array and send a array of object 
    for(var i=0;i<unique.length;i++) {
        // Bug 14 Food type matching issue  
        const availabilityByLocation = await Available.find({'location' : unique[i],'type_of_food' : type2 }); 
        if(availabilityByLocation.length != 0) // To remove empty object from our list 
        list.push(availabilityByLocation);
    }
    res.locals.list = list; // Now we can use this list object in all template
    console.log(list);
    res.status(201).json({
        "Status" : "Success",
        list
    });

}

/*
Output of this list that we have as array of array. Now on basis of this array  we have 
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
    [] // We have removed this empty list 

  ]
]

*/
exports.foodAllocatedToDonor = async (req,res,next) => {
    try {
        
        var available,total_till;
        // console.log(req.body);
        var data1 = JSON.parse(req.body.json_data);
        // console.log('start');
        for(var i=0;i<data1.length;i++) {
            data1[i].alloted = req.body.postedBy;
            data1[i].Availabilityid = data1[i].id;
            available = await allocate.create(data1[i]); 
        }
        for(var i=0;i<data1.length;i++) {
            data1[i].total_person_served = Number(data1[i].total) -  Number(data1[i].total_person_served);
            total_till = total_till + Number(data1[i].total_person_served);
            available = await Available.findByIdAndUpdate(data1[i].id,data1[i],{
                new: true,
                runValidators : true
            });
        }

        res.status(201).json({
            'status' : 'success',
            'message' : 'You allocation has been updated'  
        });
    }
    catch(e) {
        res.status(201).json({
            'status' : 'fail',
            'message' : 'Not able to allocate you food',
        }); 
    }

}
  
exports.RemoveAllocation = async (req,res,next) => {
    try {
        let Removing = JSON.parse(req.body);
        console.log('ram');
        res.status(201).json({
            'status' : 'success',

        });
    }
    catch(e) {
        res.status(404).json({
            'status' : 'fail',
            'message' : 'Facing some error in Reallocating food'
        });
    }
}