import express from "express"
import { addCategory, deleteCategory, getAllCategories, getSingleCategory, updateCategory } from "./category.controller.js"
import { validation } from './../../middleware/validation.js';
import { addCategoryVal, updateCategoryVal } from "./category.validation.js";
import { paramsIdVal } from "../../utils/sharedValidation.js";
import { uploadSingleFile } from "../../services/fileUpload/uploads.js";
import { allowedTo, protectedRoutes } from "../auth/auth.controller.js";

const categoryRouter = express.Router()


categoryRouter
    .route('/')
    .post(protectedRoutes,allowedTo('admin'), uploadSingleFile('image'), validation(addCategoryVal), addCategory)
    .get(getAllCategories)


categoryRouter
    .route('/:id')
    .get(validation(paramsIdVal), getSingleCategory)
    .put(protectedRoutes,allowedTo('admin'),uploadSingleFile('image'), validation(updateCategoryVal), updateCategory)
    .delete(protectedRoutes,allowedTo('admin'),validation(paramsIdVal), deleteCategory)

export default categoryRouter