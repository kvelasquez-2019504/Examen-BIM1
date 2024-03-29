import { Router } from "express";
import { check } from "express-validator";
import {validateFields} from '../middlewares/validate-fields.js';
import { productGet,
    productGetById,
    control,
    productForCategory,
    controlOutStock,
    bestSellers,
    specificProductUpdate,
    productDelete,
    searchName,
    productPost } from "./product.controller.js";
import { existsCategory, verifyQuantity } from "../helpers/db-validator.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { verifyRole } from "../middlewares/validate-role.js";
import { verifyIdProduct,existsIdCategory } from "../middlewares/validate-data.js";

const router= Router();

router.get('/',[
    validateJWT,
    verifyRole("ADMIN"),
    validateFields
],productGet);

router.get('/:idProduct',[
    validateJWT,
    verifyRole("ADMIN"),
    verifyIdProduct,
    validateFields
],productGetById);

router.get('/user/products/forCategory',[
    validateJWT,
    verifyRole('CLIENT'),
    validateFields
],productForCategory);

router.get('/control/list',[
    validateJWT,
    verifyRole("ADMIN"),
    validateFields
],control);


router.get('/control/outOfStock',[
    validateJWT,
    verifyRole("ADMIN"),
    validateFields
],controlOutStock);

router.get('/control/bestSellers',[
    validateJWT,
    verifyRole("ADMIN","CLIENT"),
    validateFields
],bestSellers);

router.get('/user/:name',[
    validateJWT,
    verifyRole("CLIENT"),
    validateFields
],searchName);

router.put('/:idProduct',[
    validateJWT,
    verifyRole("ADMIN"),
    verifyIdProduct,
    validateFields
],specificProductUpdate);

router.delete('/:idProduct',[
    validateJWT,
    verifyRole('ADMIN'),
    verifyIdProduct,
    validateFields
],productDelete);

router.post('/',[validateJWT,
    verifyRole('ADMIN'),
    check('name','The name is required').not().isEmpty(),
    check('description','The name is required').not().isEmpty(),
    check('cost','The cost is required for product').not().isEmpty(),
    check("stock",'The stock for producto is required').not().isEmpty(),
    check('salesAmount','The sales amount is required').not().isEmpty(),
    check(['cost','stock']).custom(verifyQuantity),
    check('category','Category is required with ID in Mongo format').isMongoId(),
    existsIdCategory,
    validateFields
],productPost);

export default router;