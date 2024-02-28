
import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    text: {
        type:String,
        trim:true,
        required:true,
        minLength:[3,'text must at least be 3 characters']
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product'
    },
    rate:{
        type:Number,
        min:0,
        max:5,
    }
}, { timestamps: true })


export const reviewModel = mongoose.model('review', reviewSchema)