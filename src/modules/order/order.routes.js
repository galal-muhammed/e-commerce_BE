import express from "express"
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { createOrderVal } from "./order.validation.js";
import { createCashOrder, createCheckoutSession, getAllOrders, getSpecificOrder } from "./order.controller.js";

const orderRouter = express.Router()


orderRouter
    .route('/')
    .post(protectedRoutes, allowedTo('user'), validation(createOrderVal), createCashOrder)
    .get(protectedRoutes, allowedTo('admin'), getAllOrders)

    orderRouter.post('/checkout',protectedRoutes, allowedTo('user'), validation(createOrderVal), createCheckoutSession)
orderRouter
    .route('/:id')
    .get(protectedRoutes, allowedTo('user','admin'), validation(paramsIdVal), getSpecificOrder)

export default orderRouter