const rideService=require('../services/ride.service')
const mapService = require('../services/maps.service');
const { validationResult}=require('express-validator')

module.exports.createRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    console.log(req.body)
    const {pickup,destination,vehicleType}=req.body;
   
    try{ 
        if(!pickup || !destination || !vehicleType){
        return res.status(400).json({message:"All fields are required"})
       }
        const userId=req.user._id

        const ride=await rideService.createRideService({user:userId,pickup,destination,vehicleType})
        console.log(ride)

        return res.status(201).json(ride)
    }catch(err){
        console.log(err.message)
        return res.status(500).json({message:err.message})
    }
}