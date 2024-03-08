import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:[true,'The name of producto is required']
    },
    description:{
        type:String,
        required:[true, "description is mandatory"]
    },
    cost:{
        type:Number,
        required:[true, "The price of the product is mandatory"]
    },
    stock:{
        type:Number,
        required:[true, "Stock is mandatory"]
    },
    salesAmount:{
        type:Number,
        default:0
    },
    category:{
        type:Schema.Types.ObjectId,
        default:""
    },
    state:{
        type:boolean,
        default:true
    }
});

ProductSchema.method.JSON=function(){
    const {__v,_id,state,...product} = this.toObjetct();
    product.uid=product._id;
    return product;
}

export default mongoose.model('Product',ProductSchema);