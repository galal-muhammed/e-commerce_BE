import { AppError } from "../utils/AppError.js"

export const validation = (schema) => {
    return (req, res, next) => {
        let filter={}
        if (req.file){
            filter={image:req.file,...req.body,...req.params,...req.qurey}, { abortEarly: false }
        }
        else if(req.files){
            filter={...req.files,...req.body,...req.params,...req.qurey}, { abortEarly: false }
        }
        else{
            filter={...req.body,...req.params,...req.qurey}, { abortEarly: false }
        }
        const { error } = schema.validate(filter, { abortEarly: false })
        if (!error) {
            next()
        } else {
            next(new AppError(error.details[0].message, 401))
        }
    }
}