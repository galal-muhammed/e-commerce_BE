
import slugify from 'slugify';
import { catchError } from '../../middleware/catchError.js';
import { deletOne } from '../handlers/handlers.js';
import { ApiFeatures } from '../../utils/ApiFeatures.js';
import { AppError } from '../../utils/AppError.js';
import { couponModel } from './../../../databases/models/coupon.model.js';

const addCoupon = catchError(async (req, res, next) => {

    let isCouponExist = await couponModel.findOne({ code: req.body.code })
    if (isCouponExist) return next(new AppError('this coupon already exist', 401))
    let coupon = new couponModel(req.body)
    await coupon.save()
    res.json({ message: "success", coupon })
})

const getAllCoupons = catchError(async (req, res, next) => {
    let apiFeature = new ApiFeatures(couponModel.find(), req.query)
    apiFeature.search().fields().filter().pagination().sort()
    let coupons = await apiFeature.mongooseQuery
    res.json({ message: "success", page: apiFeature.pageNumber, coupons })
})

const getSingleCoupon = catchError(async (req, res, next) => {
    let document = await couponModel.findById(req.params.id)

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const updatecoupon = catchError(async (req, res, next) => {

    let document = await couponModel.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true })

    !document && res.status(404).json({ message: "failed", error: "document not found" })
    document && res.json({ message: "success", document })
})

const deletecoupon = deletOne(couponModel)
export {
    addCoupon,
    getAllCoupons,
    getSingleCoupon,
    updatecoupon,
    deletecoupon,
}