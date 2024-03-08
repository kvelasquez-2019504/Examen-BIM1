import { request, response } from "express";
import Product from "./product.model.js";

export const productGet=async(req=request,res=response)=>{
    const [total,products] = await Promise.all([
        Product.countDocuments(),
        Product.find({state:true})
    ]);
    res.status(200).json({
        total,
        products
    });
}

export const productGetById=async(req=request,res=response)=>{
    const {idProduct}=req.params;
    const producSearch = await Product.findById(idProduct);
    res.status(200).json({
        msg:"Your product was found!",
        producSearch
    });
    
}

export const control =async (req=request, res=response)=>{
    let productsExist=[];
    let outOfStock= [];
    let notExist=[];
    const [totalProducts,products,totalNotExist,productsNotExist,productsOutStock] = await Promise.all([
        Product.countDocuments({state:true}),
        Product.find({$and:[{state:true},{stock:{$gt:0}}]}),
        Product.countDocuments({state:false}),
        Product.find({state:false}),
        Product.find({stock:0})
    ]);
    for(let product of products){
        const {name,cost,stock,salesAmount,state}=await Product.findById(product._id);
        productsExist.push({name,cost,stock,salesAmount,state});
    }
    for(let product of productsOutStock){
        const {name,cost,stock,salesAmount,state}=await Product.findById(product._id);
        outOfStock.push({name,cost,stock,salesAmount,state});
    }
    for(let product of productsNotExist){
        const {name,cost,stock,salesAmount,state}=await Product.findById(product._id);
        notExist.push({name,cost,stock,salesAmount,state});
    }
    res.status(200).json({
        totalProducts,
        productsExist,
        totalNotExist,
        notExist,
        outOfStock
    });
}

export const controlOutStock =async (req=request,res=response)=>{
    let outOfStock= [];
    const [totalProducts,productsOutStock] = await Promise.all([
        Product.countDocuments({$and:[{state:true},{stock:0}]}),
        Product.find({$and:[{state:true},{stock:0}]})
    ]);
    for(let product of productsOutStock){
        const {name,description,cost,stock,salesAmount,state}=await Product.findById(product._id);
        outOfStock.push({name,description,cost,stock,salesAmount,state});
    }
    res.status(200).json({
        totalProducts,
        outOfStock
    });
}

export const bestSellers =async(req=request,res=response)=>{
    const [totalProducts,salesAmount]=await Promise.all([
       Product.countDocuments({state:true}),
       Product.find({state:true})
    ]);
}

export const specificProductUpdate=async(req=request,res=response)=>{
    const {idProduct}=req.params;
    const cuerpo = req.body;//obtengo el cuerpo como tal
    await Product.findByIdAndUpdate(idProduct,cuerpo);//le seteo los atributos que esten en el cuerpo, al producto buscado por id
    const productSearch =await Product.findById(idProduct);
    res.status(200).json({
        msg: "Product updated",
        productSearch
    });
}

export const productPost = async (req=request,res=response)=>{
    const {name,description,cost,stock,salesAmount,category}=req.body;
    const productNew= new Product({name:name,description:description,cost:cost, stock:stock,salesAmount:salesAmount,category:category});
    await productNew.save();
    res.status(200).json({
        msg:"The product has been saved",
        productNew
    });
}