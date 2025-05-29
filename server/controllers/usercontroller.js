// const usermodel = require("../models/usermodel.js");
const userService=require('../services/userService')
const {validationResult}=require('express-validator')
const userModel=require('../utils/authHelpers.js')
const { generateToken, comparePassword, hashedPassword } = require("../utils/authHelpers.js");

module.exports.registerUser = async(req,res,next)=>{
   
    console.log('body',req.body)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { fullname, email, password } = req.body;
    
    console.log("The user is",req.body)

    const hashedPass=await hashedPassword(password)

    const user=await userService.createUser({
        
        fullname,
        email,
        password:hashedPass
    })

    const token=await generateToken();

    res.status(201).json({token,user})
}
