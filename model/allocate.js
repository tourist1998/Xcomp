
const mongoose = require('mongoose');

const AllocateSchema = mongoose.Schema({
    Availabilityid : {
        type: mongoose.Schema.ObjectId
    },
    total_person_served : {
        type : Number
    },
    alloted : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
});
AllocateSchema.pre(/^find/,async function(next)  {
    this.populate({
        path : 'alloted'
    })
    next(); 
})
const Allocate = mongoose.model('Allocate',AllocateSchema);
module.exports = Allocate;