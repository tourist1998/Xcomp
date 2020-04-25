const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    Name : {
        type : String,
        required: [true,"A admin must have a name"]
    },
    UserName : {
        type : String,
        required: [true,"UserName is must"]
    },
    Password : {
        type : String,
        required : [true]
    },
    Passwordconfirm : {
        type : String ,
        validate : {
            validator : function(el) {
                return el === this.Password 
            }
        }
    }
})

const Admin = mongoose.model ('Admin',adminSchema);
modules.export = Admin;