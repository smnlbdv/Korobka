import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true,
    },
    product: {
        type: Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    text: {
        type: Types.String,
        required: true,
    },
    stars: {
        type: Types.Number,
        required: true,
        default: 0,
    },
    data: {
        type: Types.Date,
        required: true,
    },
    slider: [{
        type: String
    }],
    tags: [{
        type: Types.String,
    }],
    comments: [{
        type: Types.String,
    }],
})

export default mongoose.model('Cart', shema)