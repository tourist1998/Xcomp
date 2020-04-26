const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User  = require('./usermodel.js');
const DonorSchema = mongoose.Schema({
    TypeofFood : {
        type : String,
        enum : ["Veg","Halal","No-Beef-Non-Veg","Anything"],
        default : "Anything"
    },
    AreaofService : {
        type : String,
        trim : true
    },
    Details : {
        type: mongoose.Schema.ObjectId,  
        ref: 'User'
    }
},{
    toJSON: { virtuals: true },  // We wanted to show up this virtual thing whenever there is an object
    toObject: { virtuals: true } 
});

DonorSchema.pre(/^find/,async function(next)  {
    const user = User.find({Details: this.Details});
    console.log(user);
    next();
})

const Donor =mongoose.model( 'Donor' , DonorSchema ); 
module.exports = Donor;