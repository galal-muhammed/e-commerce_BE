import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    orderItems: [{
        product: {
            type: mongoose.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: Number
    }],
    shippingAddress: {
        street: String,
        phone: String,
        city: String
    },
    totalPrice: Number,
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    isDelivered: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


export const orderModel = mongoose.model('order', orderSchema)