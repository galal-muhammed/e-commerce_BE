import Joi from "joi";

const createOrderVal = Joi.object({
    shippingAddress: Joi.object({
        street: Joi.string().required().trim(),
        phone: Joi.string().required().trim(),
        city: Joi.string().required().trim()
    })
})

const updateCartVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    quantity: Joi.number().min(1).required().options({ convert: false }),
})



export { createOrderVal, updateCartVal }