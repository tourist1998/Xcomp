

const mongoose = require('mongoose');

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
        type : Date,
        default : Date.now()
    },
    postedBy : {
        type: mongoose.Schema.ObjectId,  
        ref: 'NGO'
    }
})

const Need = mongoose.model('Need',NeedSchema);
module.exports = Need;