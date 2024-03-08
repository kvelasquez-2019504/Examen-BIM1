import { request,response } from "express";
import Category from "./category.model.js";

export const categoryPost = async(req=request, res=response)=>{
    const {name,description}=req.body;
    const categoryNew = new Category({name,description});
    //const categoryNew = await Category.save();
    res.status(200).json({
        msg:"The category has been saved",
        categoryNew
    })
}