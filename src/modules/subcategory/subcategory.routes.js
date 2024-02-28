import express from "express"
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { validation } from "../../middleware/validation.js";
import { addSubCategoryVal, updateSubCategoryVal } from "./subcategory.validation.js";
import { addsubCategory, deletesubCategory, getAllsubCategories, getSinglesubCategory, updatesubCategory } from "./subcategory.controller.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const subcategoryRouter = express.Router()


subcategoryRouter
    .route('/')
    .post(protectedRoutes,allowedTo('admin'),validation(addSubCategoryVal),addsubCategory)
    .get(getAllsubCategories)


    subcategoryRouter
    .route('/:id')
    .get(protectedRoutes,allowedTo('admin'),validation(paramsIdVal),getSinglesubCategory)
    .put(protectedRoutes,allowedTo('admin'),validation(updateSubCategoryVal),updatesubCategory)
    .delete(protectedRoutes,allowedTo('admin'),validation(paramsIdVal),deletesubCategory)

export default subcategoryRouter