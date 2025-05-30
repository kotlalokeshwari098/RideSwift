const express=require('express')
const cors=require('cors') 
const app=express()
const db=require('./db/db')
const userroutes=require('./routes/user.routes')
const cookieParser = require("cookie-parser");
const captainroutes=require('./routes/captain.route')



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/user',userroutes)
app.use('/captain',captainroutes)

module.exports=app