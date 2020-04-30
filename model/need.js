

const mongoose = require('mongoose');
const User = require('./usermodel.js');
const NeedSchema = mongoose.Schema({
    total_person_served : {
        type : Number ,
        Required : [true,'Total person to be served must be in list']
    },
    type_of_food : {
        type : String,
        enum : ["Veg","Halal","No-Beef-Non-Veg","Anything"],
        default : "Anything"
    },
    pickuptime : {
        type : String,
        Required : [true,'Pickup time must be submitted']
    },
    location : {
        type : String 
    },
    Days_of_serve : {
        type : [String],
        enum : ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    },
    postedBy : {
        type: mongoose.Schema.ObjectId,  
        ref: 'User'
    }
})
NeedSchema.pre(/^find/,async function(next)  {
    this.populate({
        path : 'postedBy',
        select : '-Password '
    })
    next(); 
})
const Need = mongoose.model('Need',NeedSchema);
module.exports = Need;