const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/Users');
const bcrypt = require('bcrypt');
const generateAuthToken = require('../jwtTokenGenerator');



//signup
router.post('/register' , async(req , res)=>{
    let user =  req.body;
    // console.log(user);
    let Email = await User.findOne({email:user.email});
    if(Email){
        res.send('An account with this email already exists');
    }
    else{
        console.log(user.password);
        user.password = await bcrypt.hash(user.password , 10);
        console.log(user.password);
        console.log(user.firstName);
        let dbUser = new User({
            firstName : user.firstName,
            lastName : user.lastName,
            email : user.email,
            password : user.password
        })
        await dbUser.save();
        res.send('signup successfull');
    }
})


//login
router.post('/login' , async(req , res)=>{
   let userFormData = req.body;
   console.log(userFormData);

   let userDbInfo = await User.findOne({email:userFormData.email});

   if(!userDbInfo){
    return res.send('jao jakar pehle register karke aao')
   }

   let validatePass = await bcrypt.compare(userFormData.password , userDbInfo.password);

   if(!validatePass){
    return res.send('user not authenticated');
   }

   const token = generateAuthToken(userDbInfo);
   //console.log(token);
   res.send({
    data:{
        token:token,
        userDbInfo:userDbInfo
    },
    msg:"sab kuch sahi chal rha hai user loggedIn"
   })



})



























module.exports = router;
