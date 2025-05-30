const userModel = require("../models/user.model.js");

module.exports.createUser = async ({
  fullname,
  email,
  password,
}) => {
  console.log(fullname,email,password)
  if (!fullname || !email || !password) {
    throw new Error("all fields are required");
    
  }
  let username = await userModel.findOne({ email });
  if (username)
    throw new Error("email already exist")

  let user = await userModel.create({
    email,
    fullname,
    password,
   
  });
  return user;
};
