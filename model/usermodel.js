const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema({
    Name : {
        type: String,
        required: [true,'A user must have a Name'], 
    },
    UserName : {
        type : String,
        required: [true,`A user must have a user name`],
        unique : [true,'This userName already exist']
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
                for(var i=0;i<el.length();i++) {
                    if(el[i]>='0'&&el[i]<='9') continue;
                    else return false;
                }
                return el.length === 10 && el[0]!='0' // Check wether phone is of 10 length
            }
        }
    },
    Password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8 , // Password should be atleast of length 8
        maxlength:12,
        select : 'false'
    },
    PasswordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
          validator: function(el) {
            return el === this.Password;
          },
          message: 'Passwords are not the same!'
        },
        select : 'false'
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
    TypeofFood : {
        type : String,
        default : "Anything"
    },
    AreaofService : {
        type : String
    },
    DirectorName : {
        type : String,
    },
    DirectorPhone : {
        type : String,
        validate: {
            validator() {
                for(var i=0;i<el.length();i++) {
                    if(el[i]>='0'&&el[i]<='9') continue;
                    else return false;
                }
                return el.length === 10 && el[0]!='0'
            } 
        }
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