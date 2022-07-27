const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        max:255,
        required:true
    },
    email:{
        type:String,
        max:255,
        required:true
    },
    password:{
        type:String,
        max:255,
        required:true
    }
});




module.exports = mongoose.model("users",userSchema);