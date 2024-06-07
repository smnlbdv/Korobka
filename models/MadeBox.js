import mongoose, { Types } from 'mongoose'

const shema = new mongoose.Schema({
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    },
    typesBox: [{
        product: {
            type: Types.ObjectId,
            ref: 'BoxType'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    product: [{
        product: {
            type: Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    postCard: [{
        product: {
            type: Types.ObjectId,
            ref: 'PostCard'
        },
        quantity: {
            type: Number,
            default: 1
        }
    }],
    image: {
        type: String,
        default: "http://localhost:5000/typesBox/box-craft-box.png"
    },
    title: {
        type: String,
        default: "Сборный подарок"
    },
    price: Number,
    created_at: {
        type: Date,
        default: Date.now
    }
})


export default mongoose.model('MadeBox', shema)