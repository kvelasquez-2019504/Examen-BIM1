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

export const categoryPut = async(req=request,res=response)=>{
    const {idCategory}=req.params;
    const {__v,_id,state,...resto}=req.body;
    await Category.findByIdAndUpdate(idCategory,resto);
    const categorySearch = await Category.findById(idCategory);
    res.status(200).json({
        msg:"Category updated",
        categorySearch
    });
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