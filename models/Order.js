import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
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
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Новый'
    },
    address: {
        type: String,
        required: true
    },
    wayPay: {
        type: String,
        required: true
    },
    createdOrder: {
        type: Date,
        default: Date.now,
    },
    updatedOrder: {
        type: Date,
    }
})

export default mongoose.model('Order', shema)