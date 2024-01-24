import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    review: {
        type: Types.ObjectId,
        ref: 'Review',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})


export default mongoose.model('Comment', shema)