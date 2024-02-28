import express from "express"
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { validation } from "../../middleware/validation.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";
import { addAddressVal } from "./address.validation.js";
import { addAddress, getLoggedUserAddresses, removeAddress } from "./address.controller.js";

const addressRouter = express.Router()


addressRouter
    .route('/')
    .patch(protectedRoutes,allowedTo('user'),validation(addAddressVal),addAddress)
    .get(protectedRoutes,allowedTo('user'),getLoggedUserAddresses)


    addressRouter
    .route('/:id')
    .delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal),removeAddress)

export default addressRouter