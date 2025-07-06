const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const estimatedTime=require('../utils/distance.time')

async function getFare(pickup, destination,vehicleType) {

    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistance(pickup, destination);
    // console.log(typeof distanceTime)

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const distanceTimeInMinutes= estimatedTime.getEstimatedTime(distanceTime,vehicleType)
    // console.log(distanceTimeInMinutes)
    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime / 1000) * perKmRate.auto) + ((distanceTimeInMinutes.duration) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime / 1000) * perKmRate.car) + ((distanceTimeInMinutes.duration ) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime / 1000) * perKmRate.moto) + ((distanceTimeInMinutes.duration ) * perMinuteRate.moto))
    };

    return fare;


}

module.exports.getFare = getFare;


function getOtp(num) {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}


module.exports.createRideService = async ({
    user, pickup, destination, vehicleType
}) => {
    // console.log("hello creating ride")
    // console.log(user,pickup,destination,vehicleType)
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const originCoordinate=await mapService.getAddressCordinate(pickup);
            // console.log(originCoordinate)
    const destinationCoordinate=await mapService.getAddressCordinate(destination)
    const fare = await getFare(originCoordinate, destinationCoordinate,vehicleType);
    const ride = await rideModel.create({
        user,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
        
    })
    

    return ride;
    
}

module.exports.confirmRide = async ({
    rideId,captainId
}) => {
    console.log(rideId,captainId)
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'accepted',
        captain: captainId
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    return ride;

}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    return ride;
}

module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}