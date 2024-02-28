import Joi from "joi";

const addReviewVal = Joi.object({
    text: Joi.string().min(1).max(200).required().trim(),
    rate: Joi.number().min(0).max(5).required(),
    product:Joi.string().hex().length(24).required(),

})

const updateReviewVal = Joi.object({
    id:Joi.string().hex().length(24).required(),
    text: Joi.string().min(1).max(200).trim(),
    rate: Joi.number().min(0).max(5),
})



export { addReviewVal,updateReviewVal }