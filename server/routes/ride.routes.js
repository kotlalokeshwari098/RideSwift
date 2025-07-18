const express=require('express')
const router=express.Router()
const {body,query}=require('express-validator')
const rideController=require('../controllers/ride.controller')
const authMiddleware=require('../middlewares/auth.middleware')

router.post('/create',
    body('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto','car','motorcylce']).withMessage('Invalid vehicleType address')
,
authMiddleware.authUser,rideController.createRide)


router.get('/getfare',
    authMiddleware.authUser,
    query('pickup').isString().isLength({min:3}).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({min:3}).withMessage('Invalid destination address'),
    rideController.getFareEstimate
)

router.post('/confirm', authMiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
   rideController.confirmRide)


module.exports=router;