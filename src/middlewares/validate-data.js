import User from "../users/user.model.js";
import bcryptjs from "bcryptjs";
import Product from "../products/product.model.js";
import Category from "../categories/category.model.js";

export const verifyUsername = async (req, res, next) => {
    const userLog = req.user;
    const { username } = req.body;
    try {
        //Busco el usuario por username
        const userSearch = await User.findOne({ username: username });
        //Si el usuario no existe, el username no esta en uso
        if (!userSearch) {
            next();
        } else {
            //evaluo si el id es el mismo que el del usuario logueado, sino el usurname esta en uso
            if (userLog.id != userSearch._id) {
                return res.status(400).json({
                    msg: "The username is used for another user."
                });
            } else {
                next();
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Contact administrator"
        });
    }
}

export const verifyPassword = async (req, res, next) => {
    const userLog = req.user;
    const { password, passwordConfirm } = req.body;
    if (password != passwordConfirm) {
        return res.status(400).json({
            msg: "Passwords do not match"
        });
    } else {
        if (!bcryptjs.compareSync(password, userLog.password)) {
            return res.status(400).json({
                msg: "The password is not the same as your account password."
            });
        } else {
            next();
        }
    }
}

export const verifyIdProduct = async (req, res, next) => {
    const { idProduct } = req.params;
    try {
        const productSearch = await Product.findById(idProduct);
        if (!productSearch) {
            return res.status(400).json({
                msg: "The product not exist in the database"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Check that the ID is from Mongo. If not, contact the administrator."
        });
    }
}
export const verifyIdProductShopping = async (req, res, next) => {
    const { idProduct } = req.body;
    try {
        const productSearch = await Product.findById(idProduct);
        if (!productSearch) {
            return res.status(400).json({
                msg: "The product not exist in the database"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Check that the ID is from Mongo. If not, contact the administrator."
        });
    }
}

export const verifyIdCategory = async (req, res, next) => {
    const { idCategory } = req.params;
    try {
        if (idCategory != "65ebdbbf0eb0d0797410ccc9") {
            const categorySearch = await Category.findById(idCategory);
            if (!categorySearch) {
                return res.status(400).json({
                    msg: "The category does not exist in database"
                });
            }

        } else {
            return res.status(400).json({
                msg: "This category cannot be  or deleted"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Contact administrator"
        });

    }
}


export const verifyQuantityBuy = async (req, res, next) => {
    const { quantityBuy, idProduct } = req.body;
    if (quantityBuy <= 0) {
        return res.status(400).json({
            msg: 'The quantity of product to be purchased must be greater than 0'
        });
    }
    const productSearch = await Product.findById(idProduct);
    if (productSearch.stock < quantityBuy) {
        return res.status(400).json({
            msg: `The stock of product ${productSearch.name} is ${productSearch.stock}`
        });
    }
    next();
}

export const existsIdCategory = async (req, res, next) => {
    const { category } = req.body;
    try {
        const categorySearch = await Category.findById(category);
        if (!categorySearch) {
            return res.status(400).json({
                msg: "The category does not exist in database"
            });
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Check that the ID is from Mongo. If not, contact the administrator."
        });
    }
}