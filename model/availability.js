




const mongoose = require('mongoose');

const AvailabilitySchema = mongoose.Schema({
    total_person_served : {
        type : Integer ,
        Required : [true,'Total person to be served must be in list']
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
        type : Date,
        default : Date.now()
    },
    postedBy : {
        type: mongoose.Schema.ObjectId,  
        ref: 'Donor'
    }
}) 

const Availability = mongoose.model('Availability',AvailabilitySchema);
module.exports = Availability;