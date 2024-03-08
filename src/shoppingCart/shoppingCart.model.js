import mongoose,{Schema} from "mongoose";

const ShoppingCartSchema= Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        required:[true,"The user id required"]
    },
    idProduto:{
        type:Schema.Types.ObjectId,
        required:[true,'The product id required']
    },
    quantityBuy:{
        type:Number,
        default:0
    },
    totalPrice:{
        type:Number,
        default:0
    }
})