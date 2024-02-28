import express from "express"
import { validation } from '../../middleware/validation.js';
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { uploadSingleFile } from "../../services/fileUpload/uploads.js";
import { addBrandVal, updateBrandVal } from "./brand.validation.js";
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "./brand.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const brandRouter = express.Router()


brandRouter
    .route('/')
    .post(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo'),validation(addBrandVal),addBrand)
    .get(getAllBrands)


    brandRouter
    .route('/:id')
    .get(validation(paramsIdVal),getSingleBrand)
    .put(protectedRoutes,allowedTo('admin'),uploadSingleFile('logo'),validation(updateBrandVal),updateBrand)
    .delete(protectedRoutes,allowedTo('admin'),validation(paramsIdVal),deleteBrand)

export default brandRouter