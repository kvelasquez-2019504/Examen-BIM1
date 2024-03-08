import { Router } from 'express';
import {check} from 'express-validator';
import { validateFiels } from '../middlewares/validate-fields.js';
import { existsUsername,validateAgeUser } from '../helpers/db-validator.js';
import { userPost } from './user.controller.js';
const router = Router();

router.post('/',[
    check("username","The username is required for the account").not().isEmpty(),
    check("username").custom(existsUsername),
    check('name','Your name is required for the account').not().isEmpty(),
    check('age','your age is mandatory for the account').not().isEmpty(),
    check('age').custom(validateAgeUser),
    check('password','The password is mandatory and with a minimum of 6 characters').isLength({min:6}),
    validateFiels,
],userPost);

export default router;
