import { Router } from "express";
import { check } from "express-validator";
import { validateFields } from "../middlewares/validate-fields.js";
import { categoryGet,
    categoryPut,
    categoryDelete,
    categoryPost } from "./category.controller.js";
import { verifyIdCategory } from "../middlewares/validate-data.js";
import { verifyRole } from "../middlewares/validate-role.js";
import { validateJWT } from "../middlewares/validateJWT.js";

const router = Router();

router.get('/',[validateJWT,
    verifyRole("ADMIN"),
    validateFields
],categoryGet);

router.put('/:idCategory',[
    validateJWT,
    verifyRole("ADMIN"),
    verifyIdCategory,
    check('name','The name of category is required').not().isEmpty(),
    check('description','The description is required').not().isEmpty(),
    validateFields
],categoryPut);

router.delete('/:idCategory',[
    validateJWT,
    verifyRole("ADMIN"),
    verifyIdCategory,
    validateFields
],categoryDelete);

router.post('/',[
    validateJWT,
    verifyRole("ADMIN"),
    check('name','The name of category is required').not().isEmpty(),
    check('description','The description is required').not().isEmpty(),
    validateFields
],categoryPost);

export default router;