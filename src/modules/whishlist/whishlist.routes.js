import express from "express"
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToWhishlistVal } from "./whishlist.validation.js";
import { addToWhishlist, getLoggedUserwhishlist, removeFromWhishlist, } from "./whishlist.controller.js";

const whishlistRouter = express.Router()


whishlistRouter
    .route('/')
    .patch(protectedRoutes,allowedTo('user'),validation(addToWhishlistVal),addToWhishlist)
    .get(protectedRoutes,allowedTo('user'),getLoggedUserwhishlist)


    whishlistRouter
    .route('/:id')
    .delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeFromWhishlist)

export default whishlistRouter