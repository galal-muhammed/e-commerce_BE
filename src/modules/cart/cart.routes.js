import express from "express"
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addToCartVal } from "./cart.validation.js";
import { addToCart, applyCoupon, clearLoggedUserCart, getLoggedUserCart, removeItemFromCart } from "./cart.controller.js";

const cartRouter = express.Router()


cartRouter
    .route('/')
    .post(protectedRoutes, allowedTo('user'), validation(addToCartVal), addToCart)
    .get(protectedRoutes, allowedTo('user'), getLoggedUserCart)
    .delete(protectedRoutes, allowedTo('user'),clearLoggedUserCart)

    cartRouter.post('/applycoupon',protectedRoutes,allowedTo('user'),applyCoupon)
cartRouter
    .route('/:id')
    .delete(protectedRoutes, allowedTo('user'), validation(paramsIdVal), removeItemFromCart)

export default cartRouter