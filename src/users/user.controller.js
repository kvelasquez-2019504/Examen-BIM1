import { request,response } from "express";
import bcryptjs from 'bcryptjs';
import User from "./user.model.js";

export const userPost = async(req,res)=>{
    const {username,name,age,password}= req.body;
    const userNew = new User({username,name,age,password});
    res.status(200).json({
        msg:"you have successfully registered",
        userNew
    });
}