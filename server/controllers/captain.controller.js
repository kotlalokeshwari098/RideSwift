const captainModel = require("../models/captain.model.js");
const captainService = require("../services/captain.service.js");
const { validationResult } = require("express-validator");
const blackListTokenModel = require("../models/blacklistToken.model.js");
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


module.exports.loginCaption = async (req, res, next) => {
  // console.log('body',req.body);
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const captain = await captainModel.findOne({ email }).select("+password");
  // console.log("hashed password", captain.password);

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const comparedResult = await comparePassword(password, captain.password);
  // console.log(comparedResult);

  if (!comparedResult) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (comparedResult) {
    const token = await generateToken(captain);

    res.cookie("token", token);

    res.status(201).json({ token, captain });
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
  // console.log("captain profile");
  res.status(200).json(req.user);
};

module.exports.logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await blackListTokenModel.create({ token });
  res.status(200).json({ message: "Logged out" });
};