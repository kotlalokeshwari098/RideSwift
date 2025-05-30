const userModel = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const blacklistTokenModel = require("../models/blacklistToken.model.js");

module.exports.authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);
    console.log("Token received:", token);
    
    if (!token) {a
      return res.status(401).json({ message: "unauthorized - no token provided" });
    }

    const isBlackListed=await blacklistTokenModel.findOne({token})

    if(isBlackListed){
      return res.status(401).json({message:"unauthorized"})
    }

    console.log("JWT secret is", process.env.JWT_SECRET);
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    console.log('decoded', decoded);
    
    const user = await userModel.findOne({ email: decoded.email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
   return next();
  } catch (err) {
    console.error("Auth error:", err.message);
    return res.status(401).json({ error: err.message });
  }
};
