import express from "express"
import { validation } from '../../middleware/validation.js';
import { changePasswordSchemaVal, signinSchemaVal, signupSchemaVal } from "./auth.validation.js";
import { changePassword, protectedRoutes, signin, signup } from "./auth.controller.js";
import { checkEmail } from "../../middleware/checkEmailExist.js";

const authRouter = express.Router()


authRouter
    .post('/signup', checkEmail, validation(signupSchemaVal), signup)
    .post('/signin', validation(signinSchemaVal), signin)
authRouter.patch('/changepassword',protectedRoutes, validation(changePasswordSchemaVal), changePassword)
// authRouter.post('/verify/:token',verifyEmail)


export default authRouter