import { Router } from "express";
import { check } from "express-validator";
import {validateFields} from '../middlewares/validate-fields.js';
import { productPost } from "./product.controller.js";
import { validateJWT } from "../middlewares/validateJWT.js";
import { verifyRole } from "../middlewares/validate-role.js";

const router= Router();

router.post('/',[validateJWT,
    verifyRole('ADMIN'),
    check('name','The name is required').not().isEmpty(),
    check('description','The name is required').not().isEmpty(),
    check('cost','The cost is required for product').not().isEmpty(),
    check("stock",'The stock for producto is required').not().isEmpty(),
    check('salesAmount','The sales amount is required').not().isEmpty(),
    check('category','Category is required with ID in Mongo format').isMongoId(),
    validateFields
],productPost);

export default router;