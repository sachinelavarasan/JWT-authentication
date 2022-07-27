const express = require("express");
const app = express();
const authR = require("./routes/auth");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
dotenv.config();




mongoose.connect(process.env.dburl,{useNewUrlParser: true , useUnifiedTopology: true},()=>{
console.log("db connected");

})

app.use(bodyparser.urlencoded({
    extended:true
}))
app.use(cookieParser());
app.use(express.json());

app.set('view engine' , 'ejs');

app.use("/signin",authR);

app.use(express.static('public'));


app.listen(5000,()=>{
    console.log("server is running")

});