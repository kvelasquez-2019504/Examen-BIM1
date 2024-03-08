import { request,response } from "express";
import Category from "./category.model.js";

export const categoryGet = async(req=request,res=response)=>{
    const [total]=await Promise.all([
        Category.find({state:true})
    ]);
    res.status(200).json({
        total
    })
}

export const categoryPost = async(req=request, res=response)=>{
    const {name,description}=req.body;
    const categoryNew = new Category({name,description});
    const category = await categoryNew.save();
    res.status(200).json({
        msg:"The category has been saved",
        category
    })
}