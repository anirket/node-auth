const mongoose = require("mongoose");

const UserSchema =  mongoose.Schema;

const schemamodel = new  UserSchema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now() 
    }
})

const Blogready = mongoose.model("User",schemamodel);

 module.exports = Blogready; 