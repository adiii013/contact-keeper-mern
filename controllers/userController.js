const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userController = {
    registerUser: async(req,res)=>{
        try {
            const {name,email,password} = req.body
            const user = await User.findOne({email:email})
            if(user){
               return  res.status(400).json({msg:"The email already exists"})
            }
           const hashedPassword = await bcrypt.hash(password,10)
           const newUser = new User({
            name:name,
            email:email,
            password:hashedPassword
           })
           console.log(hashedPassword)
           await newUser.save()
           res.status(200).json({msg:"The user registered in succesfully"})   
        } catch (error) {
            res.status(500).json({msg:error.message})
        }
    },
    loginUser:async (req,res)=>{
        try {
            const {email,password} = req.body
            const user = await User.findOne({email:email})
            if(!user) return res.status(400).json({msg:"User does not exist"})
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch) return res.status(400).json({msg:"Incorrect password"})

            //Creating token
            const payload = {id:user._id,name:user.username}
            const token = jwt.sign(payload,process.env.TOKEN_SECRET,{expiresIn:"1d"})
            res.json({token})

        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    },
    verifiedToken:async (req,res)=>{
        try {
            const token = req.header("Authorization")
            if(!token) return res.send(false)
            jwt.verify(token,process.env.TOKEN_SECRET,async(err,verified)=>{
                if(err) return res.send(false)
                const user = await User.findById(verified.id)
                if(!user) return res.send(false)
                return res.send(true)
            })
        } catch (error) {
            return res.status(500).json({msg:error.message})
        }
    }
}

module.exports = userController