import { Router } from 'express';
import {check} from 'express-validator';
import { validateFields } from '../middlewares/validate-fields.js';
import { existsUsername,
    validateAgeUser } from '../helpers/db-validator.js';
import {validateJWT} from '../middlewares/validateJWT.js';
import { verifyRole } from '../middlewares/validate-role.js';
import { userDelete,
    userPut,
    userPost } from './user.controller.js';
import { verifyPassword,verifyUsername } from '../middlewares/validate-data.js';
const router = Router();

router.delete('/',[
    validateJWT,
    check('password','The password is required').not().isEmpty(),
    check('passwordConfirm','It is necessary to confirm the password').not().isEmpty(),
    verifyPassword,
    validateFields
],userDelete);

router.put('/',[
    validateJWT,
    verifyRole("ADMIN","CLIENT"),
    check("username","The username is required").not().isEmpty(),
    verifyUsername,
    check('name','Your name is required').not().isEmpty(),
    check('age','your age is required').not().isEmpty(),
    check('age').custom(validateAgeUser),
    check('password','The password is mandatory and with a minimum of 6 characters').isLength({min:6}),
    validateFields
],userPut);

router.post('/',[
    check("username","The username is required for the account").not().isEmpty(),
    check("username").custom(existsUsername),
    check('name','Your name is required for the account').not().isEmpty(),
    check('age','your age is mandatory for the account').not().isEmpty(),
    check('age').custom(validateAgeUser),
    check('password','The password is mandatory and with a minimum of 6 characters').isLength({min:6}),
    validateFields,
],userPost);

export default router;
