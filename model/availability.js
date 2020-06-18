const mongoose = require('mongoose');

const AvailabilitySchema = mongoose.Schema({
    total_person_served : {
        type : Number,
        Required : [true,'Total person to be served must be in list'],
        maxvalue : 250
    },
    type_of_food : {
        type : String,
        enum : ["Veg","Halal","No-Beef-Non-Veg","Anything"],
        default : "Anything"
    },
    location : {
        type : String,
        Required : [true,'location is must']
    },
    pickuptime : {
        type : String, 
        default : Date.now()
    },
    postedBy : {
        type: mongoose.Schema.ObjectId,  
        ref: 'User'
    }
}) 

AvailabilitySchema.pre(/^find/,async function(next) {
    this.populate({
        path : 'postedBy'
    })
    next();
});

AvailabilitySchema.pre('find',async function(next) {
    this.find({total_person_served :{$gt : 0}});  // Only showing person who have to serve atleast 1 person.
    next();
})
const Availability = mongoose.model('Availability',AvailabilitySchema);
module.exports = Availability;