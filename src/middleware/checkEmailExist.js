import { userModel } from "../../databases/models/user.model.js";
import { AppError } from "../utils/AppError.js";





export const checkEmail=async(req,res,next)=>{
    let user= await userModel.findOne({email:req.body.email})
    if(user) 
    {
        console.log(user);
        return next(new AppError("user already exists.",401))
    }
    next();
}