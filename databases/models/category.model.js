
import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
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
    image:String,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })
categorySchema.post('init',function(doc){
    doc.image=process.env.baseURL +'uploads/' +doc.image
})

export const categoryModel = mongoose.model('category', categorySchema)