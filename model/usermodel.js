const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema({
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
        lowercase: true
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
    Password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8 // Password should be atleast of length 8
    },
    PasswordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          validator: function(el) {
            return el === this.Password;
          },
          message: 'Passwords are not the same!'
        }
    },
    Address : {
        type : String,
        required : [true,'A address is required to contact Donor'],
        trim : true 
    },
    Type : {
        type : String,
        enum : ['Donor','NGO']
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
UserSchema.pre(/^find/,async function(next) {
    
    next();
})
UserSchema.pre('save',async function (next) {
    this.Password = await bcrypt.hash(this.Password,12);   // 12 is cost parameter means how cpu intensive this would be 
    this.PasswordConfirm = undefined;
    next(); 
})

const User =mongoose.model( 'User' , UserSchema ); 
module.exports = User;