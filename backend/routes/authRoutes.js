const express=require('express')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const User=require('../models/User')

const router=express.Router()

router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({msg:"User Already Exists"})
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({name,email,password:hashedPassword})
        await newUser.save()
        res.status(201).json({msg:"User Added Successfully"})

    }catch(err){
        console.log("REGISTER ERROR:", err)
        res.status(500).json({msg:"Server Error"})
    }
})

router.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email}).select("+password")
        if(!user){
            return res.status(400).json({msg:"Invalid Credentials"})
        }
        
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({msg:"Invalid Password"})
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )

        res.json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    }catch(err){
    console.log("LOGIN ERROR:", err)
    res.status(500).json({ message: err.message })
    }
})

module.exports=router

