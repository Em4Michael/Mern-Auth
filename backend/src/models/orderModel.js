import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const orderSchema = mongoose.Schema(
    {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        reequired: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                reequired: true
            },
            price: {
                type: Number,
                reequired: true
            },
            qty: {
                type: Number,
                reequired: true
            },
            image: {
                type: Number,
                reequired: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                reequired: true,
                ref: 'Product'
            }

    }
],
    shippingAddress:
        {
            address: {
                type: String, reequired: true
            },
            city: {
                type: Number, reequired: true
            },
            postalCode: {
                type: Number, reequired: true
            },
            country: {
                type: Number, reequired: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId, reequired: true, ref: 'Product'
            }

    },
    paymentMethod: {
        type: String,
        reequired: true
    },
    paymentResult: {
        id: {type: String},
        status: {type: String},
        updatte_time: {type: String},
        email_address: {type: String}
    },
    taxPrice: {
        type: String,
        reequired: true,
        default: 0.0
    },
    shippingPrice: {
        type: String,
        reequired: true,
        default: 0.0
    },
    totalPrice: {
        type: String,
        reequired: true,
        default: 0.0
    },
    isPaid: {
        type: Boolean,
        reequired: true,
        default: false
    },
    paidAt: {
        type: Date,
        reequired: true,
        default: Date.now
    },
    isDelivered: {
        type: Boolean,
        reequired: true,
        default: false
    },
    deliveredAt: {
        type: Date,
        reequired: true,
        default: Date.now
    }
},
{timestamps: true});

const Order = mongoose.model('Order', orderSchema);

export default Order;
