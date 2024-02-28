
import slugify from 'slugify';
import { catchError } from '../../middleware/catchError.js';
import { productModel } from './../../../databases/models/Product.model.js';
import { deletOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';

const addProduct = catchError(async (req, res, next) => {
    req.body.slug = slugify(req.body.title)
    req.body.imgCover = req.files.imgCover[0].filename
    req.body.images = req.files.images.map((img) => img.filename)


    let product = new productModel(req.body)
    await product.save()
    res.json({ message: "success", product })
})

const getAllProducts = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(productModel.find(), req.query)
    apiFeature.search().fields().filter().pagination().sort()
    let products = await apiFeature.mongooseQuery

    res.json({ message: "success", page: apiFeature.pageNumber, products })
})

const getSingleProduct = catchError(async (req, res, next) => {
    let document = await productModel.findById(req.params.id)

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const updateProduct = catchError(async (req, res, next) => {
    if (req.body.title) req.body.slug = slugify(req.body.title)
    if (req.files.imgCover) req.body.imgCover = req.files.imgCover[0].filename
    if (req.files.images) req.body.images = req.files.images.map((img) => img.filename)

    let document = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const deleteProduct = deletOne(productModel)
export {
    addProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
}