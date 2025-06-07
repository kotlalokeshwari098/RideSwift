const { validationResult } = require('express-validator');
const mapServicce=require('../services/maps.service')
const distance=require('../utils/distance.calculate')

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

module.exports.getDistanceTime=async(req,res)=>{
     const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error:errors.array()})
    }
    console.log(req);
    const {origin,destination}= req.query
    try{
         const dist=await mapServicce.getDistanceTime(origin,destination)
         res.send(dist)
    }
    catch(error){
        res.status(404).json({message:"Distance and time not found"})
    }
}


module.exports.getAutoCompleteSuggestions=async (req,res)=>{
        try{
            const errors=validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({errors:errors.array()})
            }
           
            const {input}=req.query;

            const suggestions=await mapServicce.getSuggestionsFromNominatim(input);
           
            res.status(200).json(suggestions)
        }catch(err){
            res.status(500).json({message:"internal server error"})
        }
}