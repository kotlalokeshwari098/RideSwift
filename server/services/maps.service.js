const axios = require("axios");
const distanceCalculate = require("../utils/distance.calculate");
const { listIndexes } = require("../models/user.model");
const captainModel = require("../models/captain.model");

module.exports.getAddressCordinate = async (address) => {
  try {
    // console.log(address)

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }
    const url = process.env.NOMINATIM_MAPS;
    const response = await axios.get(url, {
      params: {
        q: address,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "RideSwift",
      },
    });

    if (response.data && response.data.length > 0) {
      const { lat, lon } = response.data[0];
      // console.log(response.data[0])
      // console.log(response.data[0].lat)

      return { latitude: parseFloat(lat), longitude: parseFloat(lon) };
    } else {
      return {
        message: "No coordinates found for the provided address",
      };
    }
  } catch (error) {
    console.error("Error getting coordinates:", error);
    return { error: error.message };
  }
};

module.exports.getDistance = async (origin, destination) => {
  console.log(origin, destination);
  if (!origin || !destination) {
    throw new Error("origin and destination are required");
  }
  const distance = distanceCalculate.haversine(
    origin.latitude,
    origin.longitude,
    destination.latitude,
    destination.longitude
  );
  console.log("distance is", distance);
  return distance;
};

module.exports.getSuggestionsFromNominatim = async (input) => {
  if (!input) {
    throw new Error("query is required");
  }
  try {
    const url = process.env.PHOTON_URL;
    // console.log(url)
    const response = await axios.get(url, {
      params: {
        q: input,
        limit: 5,
      },
      headers: {
        "User-Agent": "RideSwift",
      },
    });
    if (response.data) {
      return response.data;
    } else {
      throw new Error("unable to fetch suggestions");
    }
  } catch (error) {
    throw err;
  }
};

module.exports.getCaptainInRadius = async (lng, lat, radius) => {
  console.log("ltd", lat, lng, radius);
  //radius is in km
  lat = Number(lat);
  lng = Number(lng);
  radius = Number(radius);
   console.log("ltd", lat, lng, radius);
   console.log("ltd", typeof lat, typeof lng, typeof radius);
   console.log(captainModel)
  const captains = await captainModel.find({
    location: {
      
          $geoWithin: {
            $centerSphere: [[lng,lat], radius / 6371],
      },
      
      
    },
  });
  console.log(captains,"captains")
  return captains;
};
