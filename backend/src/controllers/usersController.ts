import { request,response,NextFunction } from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import path from "path";

const getAllUsers = async(request,response,next)=>{
    //get all users from database
    try {
        const users = await User.find();
        return response.status(201).json({message:"OK",users});
        
    } catch (error) {
        return response.status(200).json({message:"Error",cause:error.message});
        console.log(error);       
    }
}
const userSignUp = async(request,response,next)=>{
    //user signup
    try {
        const {name,email,password} = request.body;
        const alreadyExist = await User.findOne({email:email});

        if(alreadyExist)
        {
            return response.status(401).send("User already exits");
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const users = new User({name,email,password:hashedPassword});
        await users.save();
        return response.status(200).json({message:"OK",id:users._id.toString()});
        
    } catch (error) {
        return response.status(200).json({message:"Error",cause:error.message});
        console.log(error);       
    }
}
const userLogin = async (request,response,next)=>{
    try{
        const {email,password} = request.body;
        const user = await User.findOne({email:email});
        if(!user)
        {
            return response.status(401).send("User not register");
        }
        const isPasswordCorrect = await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect)
        {
            return response.status(403).send("Incorrect password");
        }

        //setting up cookie and jwt token
        const expires = new Date();
        expires.setDate(expires.getDate()+7)
        const token = createToken(user._id.toString(),user.email,"7d")
        response.cookie("auth_token",token,{path:'/',domain:"localhost",expires,});
        
        return response.status(200).json({status:"ok",id:user._id.toString()});
    }
    catch (error) {
        return response.status(200).json({message:"Error",cause:error.message});
        console.log(error);       
    }
}
export { getAllUsers,userSignUp,userLogin};