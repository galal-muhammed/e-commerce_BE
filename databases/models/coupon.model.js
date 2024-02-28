
import mongoose from "mongoose";
const couponSchema = new mongoose.Schema({
    code: {
        type:String,
        trim:true,
        required:true,
    },
    expires:{
        type:Date,
    },
    discount:{
        type:Number,
        required:true,
        max:100,
        min:0
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })


export const couponModel = mongoose.model('coupon', couponSchema)