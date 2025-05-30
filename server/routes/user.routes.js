const express=require('express')
const router=express.Router()
const {body}=require('express-validator')
const usercontroller=require('../controllers/user.controller.js')
const authMiddlewareRoute=require('../middlewares/auth.middleware.js')

router.post('/register',
    [
    body('email').isEmail().withMessage('Invalid Email'),

    body('fullname.firstname').isLength({min:3}).withMessage('First name must be at least 3 characters long'),

    body('password').isLength({min:6}).withMessage('Password must be 6 charaters long')
    ],

    usercontroller.registerUser
    
)

router.post('/login',
     [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage('Password must be 6 charaters long')
    ],
    usercontroller.loginUser
)

router.get('/profile', authMiddlewareRoute.authUser ,usercontroller.getUserProfile)
router.get('/logout', authMiddlewareRoute.authUser ,usercontroller.logoutUser)

module.exports=router;