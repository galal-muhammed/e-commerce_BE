import mongoose from "mongoose";
const subCategorySchema = new mongoose.Schema({
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
    category:{
        type:mongoose.Types.ObjectId,
        ref:'category'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
}, { timestamps: true })
subCategorySchema.pre('find',function(){
    this.populate('category')
})

export const subCategoryModel = mongoose.model('subCategory', subCategorySchema)