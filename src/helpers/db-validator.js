import User from '../users/user.model.js';

export const existsUsername= async(username="")=>{
    const userSearch = await User.findOne({username:username});
    if(userSearch){
        throw new Error('The username already exists in the DataBase');
    }
}