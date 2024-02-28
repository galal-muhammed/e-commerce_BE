
import slugify from 'slugify';
import { catchError } from '../../middleware/catchError.js';
import { subCategoryModel } from './../../../databases/models/subCategory.model.js';
import { deletOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';

const addsubCategory = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)

    let subcategory = new subCategoryModel(req.body)
    await subcategory.save()
    res.json({ message: "success", subcategory })
})

const getAllsubCategories = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(subCategoryModel.find(), req.query)
    apiFeature.search().fields().filter().pagination().sort()
    let subcategories = await apiFeature.mongooseQuery
    res.json({ message: "success",page:apiFeature.pageNumber, subcategories })
})

const getSinglesubCategory = catchError(async (req, res, next) => {
    let document = await subCategoryModel.findById(req.params.id)

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const updatesubCategory = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    let document = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const deletesubCategory = deletOne(subCategoryModel)
export {
    addsubCategory,
    getAllsubCategories,
    getSinglesubCategory,
    updatesubCategory,
    deletesubCategory,
}