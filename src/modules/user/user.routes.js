import express from "express"
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js";
import { addUserVal, updateUserVal } from "./user.validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const userRouter = express.Router()


userRouter
    .route('/')
    .post(validation(addUserVal), addUser)
    .get(protectedRoutes,allowedTo('admin'),getAllUsers)


userRouter
    .route('/:id')
    .get(protectedRoutes,validation(paramsIdVal), getSingleUser)
    .put(protectedRoutes,validation(updateUserVal), updateUser)
    .delete(protectedRoutes,validation(paramsIdVal), deleteUser)

export default userRouter