import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, 'title is required'],
        trim: true,
        required: true,
        minLength: [3, 'title must at least be 3 characters'],
        maxLength: [200, 'title must be less than 3 characters']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
        minLength: [10, 'name must at least be 3 characters'],
        maxLength: [500, 'title must be less than 3 characters']
    },
    imgCover: String,
    images: [],
    price: {
        type: Number,
        min: 1,
        required: true
    },
    priceAfterDiscount: {
        type: Number,
        min: 1,
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1
    },
    sold: Number,
    rateAvg: {
        type: Number,
        max: 5,
        min: 0
    },
    rateCount: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref: 'subCategory'
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'brand'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true, toJSON: { virtuals: true } })

productSchema.post('init', function (doc) {
    if (doc.imgCover || doc.images) {
        doc.imgCover = process.env.baseURL + 'uploads/' + doc.imgCover
        doc.images = doc.images?.map((img) => process.env.baseURL + 'uploads/' + img)
    }
})

productSchema.virtual('Reviews', {
    ref: 'review',
    localField: '_id',
    foreignField: 'product',
})

productSchema.pre(/^find/, function () {
    this.populate('Reviews')
})

export const productModel = mongoose.model('product', productSchema)