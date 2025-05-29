const express=require('express')
const cors=require('cors') 
const app=express()
const db=require('./db/db')
const userroutes=require('./routes/userRoutes')


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send("Hello World")
})

app.use('/user',userroutes)

module.exports=app