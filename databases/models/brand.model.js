
import mongoose from "mongoose";
const brandSchema = new mongoose.Schema({
    name: {
        type:String,
        unique:[true,'name is required'],
        trim:true,
        required:true,
        minLength:[3,'name must at least be 3 characters']
    },
    slug:{
        type:String,
        lowercase:true,
        required:true
    },
    logo:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })
brandSchema.post('init',function(doc){
    doc.logo=process.env.baseURL +'uploads/' +doc.logo
})


export const brandModel = mongoose.model('brand', brandSchema)