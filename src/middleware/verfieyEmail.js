import { userModel } from "../../databases/models/user.model.js";


export const verifyEmail=async(req,res,next)=>{
    let user= await userModel.findOne({email:req.body.email})
    if(!user.isVerified) 
    {
        console.log(user);
        return next(new AppError("please Verify your account before signing in",401))
    }
    next();
}