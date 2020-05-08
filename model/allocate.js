
const mongoose = require('mongoose');

const AllocateSchema = mongoose.Schema({
    Needid :  {
        type: mongoose.Schema.ObjectId
    },
    Availabilityid : {
        type: mongoose.Schema.ObjectId
    },
    Amount_of_food : {
        type : Number,
        Required : [true , 'NGO must need to add Amount of food to be allocated to them']
    }
});

const Allocate = mongoose.model('Allocate',AllocateSchema);
module.exports = Allocate;