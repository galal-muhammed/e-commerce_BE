import express from "express"
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addCouponVal, updateCouponVal, } from "./coupon.validation.js";
import { addCoupon, deletecoupon, getAllCoupons, getSingleCoupon, updatecoupon } from "./coupon.controller.js";

const couponRouter = express.Router()


couponRouter
    .route('/')
    .post(protectedRoutes, allowedTo('user', 'admin'), validation(addCouponVal), addCoupon)
    .get(getAllCoupons)


couponRouter
    .route('/:id')
    .get(validation(paramsIdVal), getSingleCoupon)
    .put(protectedRoutes, allowedTo('user'), validation(updateCouponVal), updatecoupon)
    .delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), deletecoupon)

export default couponRouter