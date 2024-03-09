import { request, response } from "express";
import ShoppingCart from "./shoppingCart.model.js";
import Product from "../products/product.model.js";

export const shoppingCartGet =async (req=request,res=response)=>{
    const userLog = req.user;
    const [totalCart]=await Promise.all([
        ShoppingCart.find({$and:[{state:true},{idUser:userLog.id}]})
    ]);
    res.status(200).json({
        totalCart
    });  
}

export const shoppingCartPost = async(req=request,res=response)=>{
    const userLog = req.user;
    const {idProduct,quantityBuy}=req.body;
    const productSearch = await Product.findById(idProduct);
    const shoppingCart =new ShoppingCart({idUser:userLog.id,idProduct:idProduct,quantityBuy,totalPrice:(quantityBuy*productSearch.cost)});
    shoppingCart.save();
    res.status(200).json({
        msg:"The product was added to your cart",
        shoppingCart
    });
}