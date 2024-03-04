import mongoose from 'mongoose';

export const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,'The username is required for account']
    },
    name:{
        type:String,
        required:[true, 'Your name complet is required']
    },
    age:{
        type:Number,
        required:[true,'Your age is required for your account']
    },
    password:{
        type:String,
        required:[true,'A password is required for security']
    },
    role:{ 
        type:String,
        default:"CLIENT"
    },
    state:{
        type:Boolean,
        default:true
    }
});

UserSchema.method.JSON= function(){
    const {__v,_id,...user}=this.toObject();
    user.uid=_id;
    return user;
}

export default mongoose.model('User',UserSchema);