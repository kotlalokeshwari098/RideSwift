const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be atleast 3 characters or long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last name must be atleast 3 characters or long"],
    },
  },

  email: {
    type: String,
    required: true,
    minlength: [3, "Email must be at least 3 characters long"],
    unique: true
  },

  password:{
    type:String,
    required:true,
    select:false
  },

  socketId:{
    type:String
  }
});


const userModel=mongoose.model('user',userSchema)

module.exports = userModel;
