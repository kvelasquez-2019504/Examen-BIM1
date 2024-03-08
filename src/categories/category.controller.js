import { request,response } from "express";
import Category from "./category.model.js";
import Product from "../products/product.model.js";

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

export const categoryDelete =async (req=request,res=response)=>{
    const {idCategory} =req.params;
    let arrayNewCategories=[];
    const [productWithCategory]=await Promise.all([
        Product.find({$and:[{state:true},{category:idCategory}]})
    ]);
    for(let product of productWithCategory){
       await Product.findByIdAndUpdate(product._id,{category:"65eb106dcc44286c4fb35f5f"});
       const {name,category} = await Product.findById(product._id);
       arrayNewCategories.push({name,category});
    }
    res.status(200).json({
        arrayNewCategories
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