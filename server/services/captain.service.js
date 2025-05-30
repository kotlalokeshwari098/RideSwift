const captainModel=require('../models/captain.model.js')

module.exports.createCaptain = async ({
  firstname,lastname,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  console.log( email, password);
  if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
    throw new Error("All fields are required");
  }
  let username = await  captainModel.findOne({ email });
  if (username) throw new Error("email already exist");

  let captain = await captainModel.create({
      fullname:{
          firstname,lastname
      },
    email,
    password,
    vehicle:{
        color,plate,capacity,vehicleType
    },
  });
  return captain;
};
