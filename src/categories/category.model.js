import mongoose, {Schema} from 'mongoose';

const CategorySchema = Schema({
    name:{
        type:String,
        required:[true,"The name of category is required"]
    },
    description:{
        type:String,
        required:[true, "The description is required "]
    },
    state:{
        type:Boolean,
        default:true
    }
});

CategorySchema.method.JSON = function(){
    const {__v,_id,...category}=this.toObject();
    category.uid= _id;
    return category;
}

export default mongoose.model('Category',CategorySchema);