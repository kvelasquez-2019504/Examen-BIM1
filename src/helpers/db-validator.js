import User from '../users/user.model.js';
import Category from '../categories/category.model.js';

export const existsUsername = async (username = "") => {
    const userSearch = await User.findOne({ username: username });
    if (userSearch) {
        throw new Error('The username already exists in the DataBase');
    }
}

export const validateAgeUser = async (age = '') => {
    if (age < 18) {
        throw new Error('You need to be at least 18 years old.');
    }
}

export const verifyQuantity = async (...attribute) => {
    if (attribute.includes(0)) {
        throw new Error(`you must enter a value greater than 0`);
    }
}

export const existsCategory = async(category='')=>{
    const categorySearch = await Category.findOne({_id:category});
    if(!categorySearch){
        throw new Error('Category not exists in the database');
    }
}