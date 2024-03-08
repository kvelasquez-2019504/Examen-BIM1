import User from '../users/user.model.js';

export const existsUsername= async(username="")=>{
    const userSearch = await User.findOne({username:username});
    if(userSearch){
        throw new Error('The username already exists in the DataBase');
    }
}

export const validateAgeUser = async (age='')=>{
    if (age<18){
        throw new Error('your age is mandatory for the account');
    }
}