

import Joi from "joi";

const addUserVal = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).required(),
    repassword: Joi.valid(Joi.ref('password')).required(),
})

const updateUserVal = Joi.object({
    id:Joi.string().hex().length(24).required(),

    name: Joi.string().min(2).max(20),
    email: Joi.string().email(),
    password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
    repassword: Joi.valid(Joi.ref('password')),
    role:Joi.string().valid('user','admin')
})

export { addUserVal,updateUserVal }