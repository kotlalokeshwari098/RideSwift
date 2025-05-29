const userModel = require("../models/usermodel.js");

const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


module.exports.generateToken=()=>{
    const token=jwt.sign({email:userModel.email},process.env.JWT_SECRET)
    return token;
}
module.exports.comparePassword=async(password,hashedPassword)=>{
    return await bcrypt.compareSync(password,hashedPassword)
}
module.exports.hashedPassword=async(password)=>{
    const hashedPassword=await bcrypt.hashSync(password,10)
    return hashedPassword;
}