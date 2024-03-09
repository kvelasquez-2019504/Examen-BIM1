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
    let productsWithCategory=[];
    const [productWithCategory]=await Promise.all([
        Product.find({category:idCategory})
    ]);
    for(let product of productWithCategory){
       await Product.findByIdAndUpdate(product._id,{category:"65ebdbbf0eb0d0797410ccc9"});
       const {name,category} = await Product.findById(product._id);
       productsWithCategory.push({name,category});
    }
    const {name} =await Category.findById('65ebdbbf0eb0d0797410ccc9');
    await Category.findByIdAndUpdate(idCategory,{state:false});
    const categoryDeleted =await Category.findByIdAndUpdate(idCategory);
    res.status(200).json({
        categoryAsigned:name,
        categoryDeleted,
        newCategoryInProducts:productsWithCategory
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