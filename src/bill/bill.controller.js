import { request, response } from "express";
import ShoppingCart from '../shoppingCart/shoppingCart.model.js';
import Product from '../products/product.model.js';
import Bill from './bill.model.js';

export const billsGet =async(req=request,res=response)=>{
    const userLog = req.user;
    const [totalBills] = await Bill.find({state:true,idUser:userLog.id});
    console.log(totalBills.length);
    res.status(200).json({
        count:totalBills.length,
        totalBills
    })
}

export const payShoppingCart = async (req = request, res = response) => {
    const userLog = req.user;
    const { pay } = req.body;
    let fullPayment = 0;
    let totalItems = 0;
    let products = [];
    const [totalCart] = await Promise.all([
        ShoppingCart.find({ $and: [{ state: true }, { idUser: userLog.id }] })
    ]);
    if (totalCart.length == 0) {
        res.status(400).json({
            msg: "There are no products in your cart"
        });
    } else {
        for (let shoppingCart of totalCart) {
            const productSearch = await Product.findById(shoppingCart.idProduct);
            //Obtengo las sumatorias de items y el precio total por items
            fullPayment += shoppingCart.totalPrice;
            totalItems += shoppingCart.quantityBuy;
            //Agrego los productos a la lista Productos
            products.push({ idProduct:productSearch._id,product: productSearch.name, quantityBuy: shoppingCart.quantityBuy, totalPrice: shoppingCart.totalPrice });
            //Modifico el stock de producto y la cantidad de ventas le sumo lo comprado
            await Product.findByIdAndUpdate(shoppingCart.idProduct, { stock: (productSearch.stock - shoppingCart.quantityBuy), salesAmout: (productSearch.salesAmout + shoppingCart.quantityBuy) });
            await ShoppingCart.findByIdAndUpdate(shoppingCart._id, { state: false });
        }
        const bill = new Bill({ idUser: userLog.id, products: products, totalItems: totalItems, fullPayment: fullPayment, pay: pay, turned: (pay - fullPayment) });
        bill.save();
        res.status(200).json({
            msg: "Thanks for your purchase!",
            user: userLog.name,
            bill
        })
    }
}