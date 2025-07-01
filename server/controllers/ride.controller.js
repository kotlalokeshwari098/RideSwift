const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");


module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log(req.body);
  const { pickup, destination, vehicleType } = req.body;

  try {
    if (!pickup || !destination || !vehicleType) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const userId = req.user._id;

    const ride = await rideService.createRideService({
      user: userId,
      pickup,
      destination,
      vehicleType,
    });
    console.log(ride);

    // res.status(201).json(ride);

    const pickupCoordinate=await mapService.getAddressCordinate(pickup)
    console.log("pickupCoordinate",pickupCoordinate)
    console.log("pickupCoordinate",pickupCoordinate)

    if (!pickupCoordinate || !pickupCoordinate.latitude || !pickupCoordinate.longitude) {
      return res.status(400).json({ message: "Invalid pickup address" });
    }

    const captainsInRadius=await mapService.getCaptainInRadius(pickupCoordinate.longitude,pickupCoordinate.latitude,5)

    console.log(captainsInRadius,"radius")
    ride.otp="" 
    return res.status(200).json({captains:captainsInRadius,ride})

  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFareEstimate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const originCoordinate = await mapService.getAddressCordinate(pickup);
    console.log(originCoordinate);
    const destinationCoordinate = await mapService.getAddressCordinate(
      destination
    );
    const fare = await rideService.getFare(
      originCoordinate,
      destinationCoordinate
    );
    return res.status(200).json(fare);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
