import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    postcards: [{
        productId: {
            type: Types.ObjectId,
            ref: 'PostCard',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    product: [{
        productId: {
            type: Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    typesBox: [{
        productId: {
            type: Types.ObjectId,
            ref: 'Box_type',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    image: {
        type: String
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: Types.ObjectId,
        default: "665330eb7deaa84b374c0988",
        ref: 'Order_status'
    },
    address: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: "Сборный бокс"
    },
    wayPay: {
        type: Types.ObjectId,
        ref: 'Way_pay'
    },
    createdOrder: {
        type: Date,
        default: Date.now,
    }
})

export default mongoose.model('ConstructorOrder', shema)