const captainModel = require("../models/captain.model.js");
const captainService = require("../services/captain.service.js");
const { validationResult } = require("express-validator");
const {
  generateToken,
  comparePassword,
  hashedPassword,
} = require("../utils/auth.helpers.js");

module.exports.registerCaption = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;

  // console.log("The user is", req.body);
  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res
      .status(400)
      .json({ message: "captain with this email already exists" });
  }

  const hashedPass = await hashedPassword(password);

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPass,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });
  // console.log(user)

  const token = await generateToken(captain);

  res.status(201).json({ token, captain });
};
