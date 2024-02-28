import Joi from "joi";

const addToCartVal = Joi.object({
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().min(1).options({convert:false}),
})

const updateCartVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    quantity: Joi.number().min(1).required().options({convert:false}),
})



export { addToCartVal, updateCartVal }