const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./usermodel.js');
const NGOSchema = mongoose.Schema({
   
    DirectorName : {
        type : String,
        required:[true,'There must be a director']
    },
    DirectorPhone : {
        type : String, 
        required: [true, 'In case of emergency director phone is required']
    },
    Details : {
        type: mongoose.Schema.ObjectId,  
        ref: 'User'
    }
},{
    toJSON: { virtuals: true },  // We wanted to show up this virtual thing whenever there is an object
    toObject: { virtuals: true } 
});

const NGO =mongoose.model( 'NGO' , NGOSchema ); 
module.exports = NGO;