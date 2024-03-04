import { Router } from 'express';
import {check} from 'express-validator';
import { validateFiels } from '../middlewares/validate-fields.js';
import { existsUsername } from '../helpers/db-validator.js';
import { userPost } from './user.controller.js';
const router = Router();

router.post('/',[
    check("username","The username is required for the account").not().isEmpty(),
    check("username").custom(existsUsername),
    validateFiels,
],userPost);

export default router;
