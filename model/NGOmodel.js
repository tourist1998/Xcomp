const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const NGOSchema = mongoose.Schema({
    Name : {
        type: String,
        required: [true,'A user must have a Name'], 
    },
    UserName : {
        type : String,
        required: [true,`A user must have a user name`]
    },
    Email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true, 
        validate: [ validator.isEmail, 'Please provide a valid email']
    },
    Phone : {
        type : String,
        required : [true,'A user must need a name to contact'],
        validate : {
            validator: function(el)  {
                return el.length === 10 && el[0]!='0' // Check wether phone is of 10 length
            }
        }
    },
    DirectorName : {
        type : String,
        required:[true,'There must be a director']
    },
    DirectorPhone : {
        type : String, 
        required: [true, 'In case of emergency director phone is required']
    },
    Password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select : false
    },
    PasswordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          validator: function(el) {
            return el === this.password;
          },
          message: 'Passwords are not the same!'
        }
    },
    Address : {
        type : String,
        required : [true,'A address is required to verify NGO'],
        trim : true // to remove extra line that NGO added in entry
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {  // whether account is active or not 
        type: Boolean,
        default: true,
        select: false
    }
},{
    toJSON: { virtuals: true },  // We wanted to show up this virtual thing whenever there is an object
    toObject: { virtuals: true } 
});

NGOSchema.pre('save',async (next)=> {
    if(!this.isModified('password')) next();
    this.Password = await bcrypt.hash(this.Password,12);   // 12 is cost parameter means how cpu intensive this would be 
    this.PasswordConfirm = undefined;
    next(); 
})
const NGO =mongoose.model( 'NGO' , NGOSchema ); 
module.exports = NGO;