import mongoose,{Schema} from 'mongoose';

const ProductSchema =Schema({
    name:{
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
        type:Boolean,
        default:true
    }
});

ProductSchema.method.JSON=function(){
    const {__v,_id,state,...product} = this.toObject();
    product.uid=product._id;
    return product;
}

export default mongoose.model('Product',ProductSchema);