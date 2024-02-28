import { productModel } from '../../../databases/models/Product.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utils/AppError.js';
import { cartModel } from './../../../databases/models/cart.model.js';
import { couponModel } from './../../../databases/models/coupon.model.js';

const calcTotalPrice = (cart) => {
    let totalPrice = 0
    cart.cartItems.forEach((item) => {
        totalPrice += item.quantity * item.price
    })
    cart.totalPrice = totalPrice
}

const addToCart = catchError(async (req, res, next) => {
    let product = await productModel.findById(req.body.product)
    if (!product) return next(new AppError('product not found', 404))
    if (req.body.quantity > product.quantity) return next(new AppError('cannot add this quantity', 404))
    req.body.price = product.price
    let isCartExist = await cartModel.findOne({ user: req.user._id })

    if (!isCartExist) {
        let cart = new cartModel({
            user: req.user._id,
            cartItems: [req.body]
        })
        calcTotalPrice(cart)
        await cart.save()
        !cart && res.status(404).json({ message: "failed", error: "cart not found" })
        cart && res.json({ message: "success", cart })
    }
    else {
        let item = isCartExist.cartItems.find((item) => item.product == req.body.product)
        if (item) {
            if (item.quantity + req.body.quantity > product.quantity)
                return next(new AppError('cannot add this quantity', 404))
            item.quantity += req.body.quantity || 1
        }
        else {
            isCartExist.cartItems.push(req.body)
        }
        calcTotalPrice(isCartExist)
        await isCartExist.save()
        res.json({ message: "success", isCartExist })
    }
})

const removeItemFromCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate({ user: req.user._id }, { $pull: { cartItems: { product: req.params.id } } }, { new: true })
    calcTotalPrice(cart)
    await cart.save()
    !cart && res.status(404).json({ message: "failed", error: "cart not found" })
    cart && res.json({ message: "success", cart })
})

const getLoggedUserCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id })
    !cart && res.status(404).json({ message: "failed", error: "cart not found" })
    cart && res.json({ message: "success", cart })
})

const clearLoggedUserCart = catchError(async (req, res, next) => {
    let cart = await cartModel.findOneAndDelete({ user: req.user._id })
    !cart && res.status(404).json({ message: "failed", error: "cart not found" })
    cart && res.json({ message: "success", cart })
})

const applyCoupon = catchError(async (req, res, next) => {
    let coupon = await couponModel.findOne({ code: req.body.coupon, expires: { $gte: Date.now() } })
    if (!coupon) return next(new AppError('this coupon doesnot exist or expired', 404))

    let cart = await cartModel.findOne({ user: req.user._id })
    !cart && res.status(404).json({ message: "failed", error: "cart not found" })

    let totalPriceAfterDiscount = cart.totalPrice - (cart.totalPrice * coupon.discount) / 100
    cart.totalPriceAfterDiscount = totalPriceAfterDiscount
    await cart.save()
    res.json({ message: "success", cart })
})


export {
    addToCart,
    removeItemFromCart,
    getLoggedUserCart,
    clearLoggedUserCart,
    applyCoupon
}