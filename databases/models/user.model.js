import bcrypt from 'bcrypt'
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: [3, "name must be at least 3 characters"],
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: [8, "password must be at least 3 characters"],
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        lowercase: true
    },
    passwordChangedAt: Date,
    whishlist: [
        {
            type: mongoose.Types.ObjectId,
            ref:'product'
        }
    ],
    addresses: [
        {
            street: String,
            phone: String,
            city: String
        }
    ],
    isVerified: { type: Boolean, default: false },
}, { timestamps: true })


userSchema.pre('save', function () {
    if (this.password) this.password = bcrypt.hashSync(this.password, 8)
})
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
})

export const userModel = mongoose.model('user', userSchema)