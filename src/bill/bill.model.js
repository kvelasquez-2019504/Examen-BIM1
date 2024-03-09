import mongoose, {Schema} from 'mongoose';

const BillSchema = Schema({
    idUser:{
        type:Schema.Types.ObjectId,
        required:[true,"The user id required"]
    },
    products:{
        type:Array,
        default:[]
    },
    totalItems:{
        type:Number,
        default:0
    },
    fullPayment:{
        type:Number,
        default:0
    },
    pay:{
        type:Number,
        default:0
    },
    turned:{
        type:Number,
        default:0
    },
    state:{
        type:Boolean,
        default:true
    }
});

BillSchema.method.JSON=function(){
    const {__v,_id,state,...bill}=this.toObject();
    bill.uid=_id;
    return bill;
}

export default mongoose.model('Bill',BillSchema);