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
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
        default: 0,
    },
    date: {
        type: Date,
        required: true,
        get: function(date) {
            return new Intl.DateTimeFormat('ru-RU').format(date);
        },
        default: Date.now,
    },
    slider: [String],
    tags: [String],
    comments: [{
        type: Types.ObjectId,
        ref: 'Comment',
    }],
    likes: {
        type: Number,
        default: 0,
    }
})

export default mongoose.model('Review', shema)