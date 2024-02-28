import Joi from "joi";

const addAddressVal = Joi.object({
    street:Joi.string().required().trim(),
    phone:Joi.string().required().trim(),
    city:Joi.string().required().trim()

})
const updateAddressVal = Joi.object({
    street:Joi.string().trim(),
    phone:Joi.string().trim(),
    city:Joi.string().trim()

})



export { addAddressVal,updateAddressVal }