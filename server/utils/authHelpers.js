const userModel = require("../models/usermodel.js");

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


module.exports.generateToken=(user)=>{
    console.log("email is",user)
    console.log("JWT secret is",process.env.JWT_SECRET)
  let token=jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET)
    return token;
}
module.exports.comparePassword=async(password,hashedPassword)=>{
    const item= bcrypt.compareSync(password,hashedPassword);
    return item;
}
module.exports.hashedPassword=async(password)=>{
    const hashedPassword=await bcrypt.hashSync(password,10)
    return hashedPassword;
}