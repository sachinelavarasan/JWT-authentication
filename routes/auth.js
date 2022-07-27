const { compare } = require("bcryptjs");
const express = require("express");
const route = express.Router();
const User = require("../models/signmodel");
const {hashcreator} = require("../security/hash");
const {hashcheck} = require("../security/hash");
const {tokencreator} = require("../security/token");
const auth = require("../security/verify");




route.get("/",(req,res)=>{
    res.render("new");
      
});


route.post("/",async(req,res)=>{
    const hashpass = await hashcreator(req.body.password);
    
    const user = new User({
        username:req.body.username,
        email:req.body.email,
        password:hashpass
    });

    try{
        const saved = await user.save();
        res.redirect('/signin/login');
    }catch(err){
        res.send(err);
    }

});


route.get("/login",(req,res)=>{
    res.render("login");
      
});



route.post("/login",async(req,res)=>{
    const exist = await User.findOne({email:req.body.email});
    try{
        if(!exist)
        {
            res.redirect("/signin/login");
        }
        else{
            try{
                const checkpass = await hashcheck(req.body.password,exist.password)
                if(checkpass)
                {
                    const token = await tokencreator(exist.email);
                    res.cookie("jwt",token);   
                    res.render("view",{exist:exist});            
                }else
                {
                    res.redirect("/signin/login");
                }
            }catch(err){
                res.send(err);
            }
        }
   }catch(err)
   {
       console.log(err);
   }

});

route.get('/protected',auth,(req,res)=>{
    res.send("i am protected")
 
 });

// route.get('/',(req,res)=>{
//    res.send("u are at root page")

// });




module.exports = route;