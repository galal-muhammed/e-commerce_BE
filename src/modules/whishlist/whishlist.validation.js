import Joi from "joi";

const addToWhishlistVal = Joi.object({
    product:Joi.string().hex().length(24).required(),
})




export { addToWhishlistVal }