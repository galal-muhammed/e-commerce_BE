import Joi from "joi";

const addCouponVal = Joi.object({
    code: Joi.string().min(1).max(12).required().trim(),
    discount: Joi.number().min(1).max(100).required(),
    expires:Joi.date().required(),

})

const updateCouponVal = Joi.object({
    id:Joi.string().hex().length(24).required()
    ,
    code: Joi.string().min(1).max(12).trim(),
    discount: Joi.number().min(1).max(100),
    expires:Joi.date(),
})



export { addCouponVal,updateCouponVal }