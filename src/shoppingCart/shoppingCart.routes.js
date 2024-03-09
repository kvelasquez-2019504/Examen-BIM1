import { Router } from "express";
import { check } from "express-validator";
import { validateJWT } from "../middlewares/validateJWT.js";
import { verifyRole } from "../middlewares/validate-role.js";
import { shoppingCartGet,shoppingCartPost } from "./shoppingCart.controller.js";
import { validateFields } from "../middlewares/validate-fields.js";
import { verifyIdProductShopping,verifyQuantityBuy } from "../middlewares/validate-data.js";

const router = Router();

router.get('/',[
    validateJWT,
    verifyRole("CLIENT"),
    validateFields
],shoppingCartGet);

router.post('/',[
    validateJWT,
    verifyRole("CLIENT"),
    check("idProduct","The ID of product is required").not().isEmpty(),
    verifyIdProductShopping,
    verifyQuantityBuy,
    validateFields
],shoppingCartPost);

export default router;