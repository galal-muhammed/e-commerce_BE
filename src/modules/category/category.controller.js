
import slugify from 'slugify';
import { categoryModel } from './../../../databases/models/category.model.js';
import { catchError } from '../../middleware/catchError.js';
import { deletOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';

const addCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.image=req.file.filename
    
    let category = new categoryModel(req.body)
    await category.save()
    res.json({ message: "success", category })
})

const getAllCategories =catchError( async (req, res, next) => {
    let apiFeature = new ApiFeatures(categoryModel.find(), req.query)
    apiFeature.search().fields().filter().pagination().sort()
    let categories = await apiFeature.mongooseQuery

    res.json({ message: "success",page:apiFeature.pageNumber, categories })
})

const getSingleCategory =catchError( async (req, res, next) => {
    let document = await categoryModel.findById(req.params.id)

    !document && res.status(404).json({message:"failed",error:"document not found"})
    document && res.json({ message: "success", document })
})

const updateCategory =catchError( async (req, res, next) => {
    if(req.body.name)   req.body.slug = slugify(req.body.name)
    if(req.file)req.body.image=req.file.filename
    let document = await categoryModel.findByIdAndUpdate(req.params.id,req.body,{new:true})

    !document && res.status(404).json({message:"failed",error:"document not found"})
    document && res.json({ message: "success", document })
})

const deleteCategory =deletOne(categoryModel)
export {
    addCategory,
    getAllCategories,
    getSingleCategory,
    updateCategory,
    deleteCategory,
}