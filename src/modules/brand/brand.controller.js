
import slugify from 'slugify';
import { catchError } from '../../middleware/catchError.js';
import { brandModel } from './../../../databases/models/brand.model.js';
import { deletOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';

const addBrand = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.name)
    req.body.logo = req.file.filename
    
    let brand = new brandModel(req.body)
    await brand.save()
    res.json({ message: "success", brand })
})

const getAllBrands = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(brandModel.find(), req.query)
    apiFeature.search().fields().filter().pagination().sort()
    let Brands = await apiFeature.mongooseQuery
    res.json({ message: "success",page:apiFeature.pageNumber, Brands })
})

const getSingleBrand = catchError(async (req, res, next) => {
    let document = await brandModel.findById(req.params.id)

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const updateBrand = catchError(async (req, res, next) => {
    if (req.body.name) req.body.slug = slugify(req.body.name)
    if (req.file) req.body.logo = req.file.filename
    let document = await brandModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const deleteBrand = deletOne(brandModel)
export {
    addBrand,
    getAllBrands,
    getSingleBrand,
    updateBrand,
    deleteBrand,
}