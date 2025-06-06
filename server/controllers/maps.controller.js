const { validationResult } = require('express-validator');
const mapServicce=require('../services/maps.service')

module.exports.getCoordinates=async(req,res)=>{
    console.log("query is",req.query.address)
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    const address=req.query.address;
    try{
        const coordinates=await mapServicce.getAddressCordinate(address);
        console.log("coordinates are",coordinates)
        res.status(200).json(coordinates)
    }catch(error){
        res.status(404).json({message:"Coordinates not found"})
    }
}