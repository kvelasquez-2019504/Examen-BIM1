import { Router } from 'express';
import {check} from 'express-validator';
import { validateFiels } from '../middlewares/validate-fields.js';
import { userPost } from './user.controller.js';
const router = Router();

router.post('/',[
    check("username","The username is required for the account").not().isEmpty(),
    validateFiels,
],userPost);

export default router;
