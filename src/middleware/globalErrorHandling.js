
export const globalErrorHandling=(err,req,res,next)=>{
    err.statusCode=err.statusCode||500
    res.status(err.statusCode).json({error:err.message,stack:err.stack})
}