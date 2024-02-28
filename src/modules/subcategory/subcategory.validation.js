import Joi from "joi";

const addSubCategoryVal = Joi.object({
    name: Joi.string().min(2).max(100).required().trim(),
    category:Joi.string().hex().length(24).required(),

})

const updateSubCategoryVal = Joi.object({
    name: Joi.string().min(2).max(100).trim(),
    id:Joi.string().hex().length(24).required(),
    category:Joi.string().hex().length(24),

})



export { addSubCategoryVal,updateSubCategoryVal }