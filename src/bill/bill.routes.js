import { Router } from "express";
import { check } from "express-validator";
import {validateFields} from '../middlewares/validate-fields.js';
import { validateJWT } from "../middlewares/validateJWT.js";
import { verifyRole } from "../middlewares/validate-role.js";
import {existsIdUser} from '../middlewares/validate-data.js';

import { billsGet,
    billGetUser,
    billPut,
    payShoppingCart } from "./bill.controller.js";

const router= Router();

router.get('/',[
    validateJWT,
    verifyRole("CLIENT")
],billsGet);

router.get('/user/:idUser',[
    validateJWT,
    verifyRole('ADMIN'),
    existsIdUser,
    validateFields
],billGetUser);

router.put('/:idBill',[
    validateJWT,
    verifyRole('ADMIN'),
    validateFields
],billPut);

router.post('/',[
    validateJWT,
    verifyRole("CLIENT"),
    check('pay',"It is mandatory to pay for the products in the cart").not().isEmpty(),
    validateFields
],payShoppingCart);

export default router;