import { productModel } from '../../../databases/models/Product.model.js';
import { cartModel } from '../../../databases/models/cart.model.js';
import { catchError } from '../../middleware/catchError.js';
import { AppError } from '../../utils/AppError.js';
import * as dotenv from "dotenv"
import { orderModel } from './../../../databases/models/order.model.js';
import Stripe from 'stripe';


dotenv.config()

const stripe = new Stripe(process.env.SK);


const createCashOrder = catchError(async (req, res, next) => {

    let cart = await cartModel.findOne({ user: req.user._id })
    if (!cart) return next(new AppError('cart not found', 404))

    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    let order = new orderModel({
        user: req.user._id,
        orderItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalPrice: totalOrderPrice
    })
    await order.save()

    let options = cart.cartItems.map((product) => {
        return ({
            updateOne: {
                "filter": { _id: product.product },
                "update": { $inc: { sold: product.quantity, quantity: -product.quantity } }
            }
        })
    })
    productModel.bulkWrite(options)

    await cartModel.findOneAndDelete({ user: req.user._id })
    res.json({ message: "success", order })
})


const getSpecificOrder = catchError(async (req, res, next) => {
    let order = await orderModel.findOne({ user: req.user._id }).populate('orderItems.product')
    res.status(200).json({ message: "success", order })
})

const getAllOrders = catchError(async (req, res, next) => {
    let order = await orderModel.find().populate('orderItems.product')
    res.status(200).json({ message: "success", order })
})

const createCheckoutSession = catchError(async (req, res, next) => {

    let cart = await cartModel.findOne({ user: req.user._id })
    if (!cart) return next(new AppError('cart not found', 404))

    let totalOrderPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalPrice

    let session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    currency: 'egp',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name
                    }
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'https://www.netlify.com/',
        cancel_url: 'https://www.netlify.com/cart',
        customer_email: req.user.email,
        client_reference_id: req.user._id,
        metadata: req.body.shippingAddress
    })
    res.json({ message: "success", session })

})


export {
    createCashOrder,
    getSpecificOrder,
    getAllOrders,
    createCheckoutSession
}