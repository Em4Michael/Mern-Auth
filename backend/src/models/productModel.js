import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
},
{timestamps: true});

const productSchema = mongoose.Schema({
    name: {
        type: String,
        reequired: true,
        ref: 'User'
    },
    image: {
        type: String,
        reequired: true
    },
    description: {
        type: String,
        reequired: true
    },
    brand: {
        type: String,
        reequired: true
    },
    category: {
        type: String,
        reequired: true
    },
    price: {
        type: Number,
        reequired: true,
        default: 0
    },
    countInStock: {
        type: Number,
        reequired: true,
        default: 0
    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        reequired: true,
        default: 0
    },
    numReviews: {
        type: Number,
        reequired: true,
        default: 0
    }
},
{timestamps: true});

const Product = mongoose.model('products', productSchema);

export default Product;
