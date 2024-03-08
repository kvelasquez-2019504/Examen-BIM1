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
    },
    state:{
        type:Boolean,
        default:true
    }
});

ShoppingCartSchema.method.JSON=function(){
    const {__v,_id,state,...shoppingCar}=this.toObject();
    shoppingCar.uid=_id;
    return shoppingCar;
}

export default mongoose.model('ShoppingCar',ShoppingCartSchema);