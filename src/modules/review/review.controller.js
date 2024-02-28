
import slugify from 'slugify';
import { catchError } from '../../middleware/catchError.js';
import { deletOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';
import { reviewModel } from './../../../databases/models/review.model.js';
import { AppError } from '../../utils/AppError.js';

const addReview = catchError(async (req, res, next) => {
    req.body.user = req.user._id
    let isReviewExist = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    if (isReviewExist) return next(new AppError('you already reviewd this product', 401))
    let review = new reviewModel(req.body)
    await review.save()
    res.json({ message: "success", review })
})

const getAllReviews = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(reviewModel.find(), req.query)
    apiFeature.search().fields().filter().pagination().sort()
    let reviews = await apiFeature.mongooseQuery
    res.json({ message: "success", page: apiFeature.pageNumber, reviews })
})

const getSingleReview = catchError(async (req, res, next) => {
    let document = await reviewModel.findById(req.params.id)

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const updateReview = catchError(async (req, res, next) => {

    let document = await reviewModel.findOneAndUpdate({_id:req.params.id,user:req.user._id}, req.body, { new: true })

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const deleteReview = deletOne(reviewModel)
export {
    addReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview,
}