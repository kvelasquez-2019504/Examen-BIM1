import { request, response } from "express";
import Product from "./product.model.js";

export const productGet=async(req=request,res=response)=>{
    const [total] = await Promise.all([
        Product.find({state:true})
    ]);
    res.status(200).json({
        total
    });
}

export const productPost = async (req=request,res=response)=>{
    const {name,description,cost,stock,salesAmount,category}=req.body;
    const productNew= new Product({name:name,description:description,cost:cost, stock:stock,salesAmount:salesAmount,category:category});
    //await productNew.save();
    res.status(200).json({
        msg:"The product has been saved",
        productNew
    });
}