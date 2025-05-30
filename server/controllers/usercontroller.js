// const usermodel = require("../models/usermodel.js");
const userService = require("../services/userService");
const { validationResult } = require("express-validator");
const userModel = require("../models/usermodel.js");
const jwt=require('jsonwebtoken');
const blackListTokenModel=require('../models/blacklistTokenModel.js')
const {
  generateToken,
  comparePassword,
  hashedPassword,
} = require("../utils/authHelpers.js");

module.exports.registerUser = async (req, res, next) => {
  // console.log("body", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  // console.log("The user is", req.body);

  const hashedPass = await hashedPassword(password);

  const user = await userService.createUser({
    fullname,
    email,
    password: hashedPass,
  });
  // console.log(user)

  const token = await generateToken(user);

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res, next) => {
  // console.log("body", req.body);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");
  console.log("hashed password",user.password);

  if(!user){
    return res.status(401).json({message:"Invalid email or password"})
  }

  const comparedResult = await comparePassword(password, user.password);
  // console.log(comparedResult);

  if(!comparedResult){
    return res.status(401).json({message:"Invalid email or password"})
  }
  
  if (comparedResult) {
    const token = await generateToken(user);
    
    res.cookie("token",token)

    res.status(201).json({ token, user });
  }
};

module.exports.getUserProfile=async(req,res,next)=>{
  console.log("user profile")
      res.status(200).json(req.user)
}

module.exports.logoutUser=async(req,res,next)=>{
  res.clearCookie('token');
  const token=req.cookies.token||req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({token})
  res.status(200).json({message:"Logged out"})
}