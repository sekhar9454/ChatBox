import e from 'express';
import { generateToken } from '../lib/utils.js';
import  User  from '../models/user.model.js'

import bcript from 'bcryptjs'
import cloudinary from '../lib/cloudinary.js';


export const login = async (req, res) => {
    
    const {email , password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const isCorrectPassword = await bcript.compare(password , user.password);
        if(!isCorrectPassword) {
            return res.status(400).json({message : "Invalid Credentials"});   
        }

        generateToken(user._id , res);

        res.status(200).json({
                _id:user._id,
                fullName : user.fullName,
                email : user.email,
                profilePic : user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller ");
        res.status(500).json({"message" : "Internal Server Error"});
    }

};



export const signUp = async (req, res) => {
    const {fullName , email , password} = req.body;
    try {
        // Implement sign-up logic here
        if(!fullName || !email || !password) {
            return res.status(400).json({message : "All fields are required "});
        }
        if(password.length < 6){
            return res.status(400).json({message: "Password should be of atleast 6 length"});
        }

        const user = await  User.findOne({email});
        if(user) {
            return res.status(400).json({message : " Email already Exists"});
        }

        const salt = await bcript.genSalt(10);

        const hashedPassword = await bcript.hash(password , salt);

        const newUser = new User({
            fullName,
            email,
            password : hashedPassword
        })

        if(newUser){
            // generate web token
            generateToken(newUser._id , res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName : newUser.fullName,
                email : newUser.email,
                profilePic : newUser.profilePic
            })
        }
        else{
            res.status(400).json({message:"Invalid user data"});
        }
    } catch (error) {
        console.log("Error in signUp controller" , error.message);
        res.status(500).json({message : "Internal Server Error" });
    }
};




export const logout = (req, res) => {
    try {
        res.cookie("jwt" , "" , {
            maxAge : 0,
        })
        res.status(200).json({message:"Logged out successfully"});

    } catch (error) {
        console.log("Error in logout Controller" , error.message);
        res.status(500).json({message : "Internal server Error"});
    }
};


export const updateProfile =async  (req , res) => {
    try {
        const {profilePic}  = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message : "Profile pic is required"});
        }

        const uplaodResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId , {profilePic : uplaodResponse.secure_url} , {new : true});

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profilePic route: " , error.message);
        res.status(500).json({message:"Internal server Error"});
    }
}

export const checkAuth =(req ,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller:" , error.message);
        res.status(500).json({message : "Internal Server Error"});

    }
}